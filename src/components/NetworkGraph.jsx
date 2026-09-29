import React, { useRef, useEffect, useState } from 'react';
import { NODE_TYPES } from '../data/careerNetworkData';
import { ZoomIn, ZoomOut, RotateCcw, Play, Maximize2, ShieldAlert } from 'lucide-react';

export default function NetworkGraph({
  nodes,
  links,
  selectedNodeId,
  onSelectNode,
  searchRole,
  skillTags = [],
  isExpanded,
  onToggleExpand
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Graph state for positions & velocities
  const nodesRef = useRef([]);
  const linksRef = useRef([]);

  // Camera transform state
  const transformRef = useRef({ x: 0, y: 0, k: 1 });
  const [zoomLevel, setZoomLevel] = useState(1);

  // Interaction state
  const isDraggingCanvas = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const draggedNode = useRef(null);

  // Tooltip state
  const [tooltip, setTooltip] = useState(null);

  // Initialize node positions in a force-directed layout
  useEffect(() => {
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;

    // Create mutable node copies with positions & velocities
    const mutableNodes = nodes.map((n, i) => {
      const existing = nodesRef.current.find(old => old.id === n.id);
      if (existing) {
        return { ...n, x: existing.x, y: existing.y, vx: existing.vx || 0, vy: existing.vy || 0 };
      }
      // Angle distribution around center
      const angle = (i / nodes.length) * 2 * Math.PI;
      const radius = n.type === 'role' ? 80 : 180 + (i % 3) * 60;
      return {
        ...n,
        x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 40,
        y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0
      };
    });

    // Resolve source & target references in links
    const mutableLinks = links.map(l => {
      const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
      const targetId = typeof l.target === 'object' ? l.target.id : l.target;
      return {
        ...l,
        sourceId,
        targetId
      };
    });

    nodesRef.current = mutableNodes;
    linksRef.current = mutableLinks;

    // Center view transform
    transformRef.current = { x: 0, y: 0, k: 1 };
    setZoomLevel(1);
  }, [nodes, links]);

  // Main Animation / Physics Loop
  useEffect(() => {
    let animFrameId;
    let alpha = 1; // Cooling parameter for force simulation

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updatePhysics = () => {
      const width = containerRef.current?.clientWidth || 800;
      const height = containerRef.current?.clientHeight || 600;
      const currentNodes = nodesRef.current;
      const currentLinks = linksRef.current;

      if (!currentNodes.length) return;

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Repulsion between all nodes
      for (let i = 0; i < currentNodes.length; i++) {
        for (let j = i + 1; j < currentNodes.length; j++) {
          const n1 = currentNodes[i];
          const n2 = currentNodes[j];
          let dx = n2.x - n1.x;
          let dy = n2.y - n1.y;
          let dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = 110;

          if (dist < 320) {
            const force = (minDist * minDist) / (dist * dist) * 0.45;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (draggedNode.current !== n1) { n1.vx -= fx; n1.vy -= fy; }
            if (draggedNode.current !== n2) { n2.vx += fx; n2.vy += fy; }
          }
        }
      }

      // 2. Spring force along links
      for (let l of currentLinks) {
        const sourceNode = currentNodes.find(n => n.id === l.sourceId);
        const targetNode = currentNodes.find(n => n.id === l.targetId);
        if (!sourceNode || !targetNode) continue;

        let dx = targetNode.x - sourceNode.x;
        let dy = targetNode.y - sourceNode.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const desiredDist = 140;

        const force = (dist - desiredDist) * 0.035;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (draggedNode.current !== sourceNode) { sourceNode.vx += fx; sourceNode.vy += fy; }
        if (draggedNode.current !== targetNode) { targetNode.vx -= fx; targetNode.vy -= fy; }
      }

      // 3. Central gravity force & updating positions
      for (let n of currentNodes) {
        if (draggedNode.current === n) continue;

        // Gravity pull to center
        let dx = centerX - n.x;
        let dy = centerY - n.y;
        n.vx += dx * 0.008;
        n.vy += dy * 0.008;

        // Damping
        n.vx *= 0.82;
        n.vy *= 0.82;

        n.x += n.vx * alpha;
        n.y += n.vy * alpha;
      }

      alpha = Math.max(0.02, alpha * 0.985);
    };

    const render = () => {
      updatePhysics();

      const width = containerRef.current?.clientWidth || 800;
      const height = containerRef.current?.clientHeight || 600;

      // Ensure canvas DPI matches display
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, width, height);

      const { x, y, k } = transformRef.current;

      ctx.save();
      // Transform camera
      ctx.translate(x, y);
      ctx.scale(k, k);

      const currentNodes = nodesRef.current;
      const currentLinks = linksRef.current;

      // Find connected node IDs if a node is selected
      const connectedNodeIds = new Set();
      if (selectedNodeId) {
        connectedNodeIds.add(selectedNodeId);
        currentLinks.forEach(l => {
          if (l.sourceId === selectedNodeId) connectedNodeIds.add(l.targetId);
          if (l.targetId === selectedNodeId) connectedNodeIds.add(l.sourceId);
        });
      }

      // Draw Grid Background lines subtly
      ctx.strokeStyle = 'rgba(234, 226, 248, 0.4)';
      ctx.lineWidth = 1 / k;
      const gridSize = 60;
      for (let gx = -width * 2; gx < width * 3; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, -height * 2);
        ctx.lineTo(gx, height * 3);
        ctx.stroke();
      }
      for (let gy = -height * 2; gy < height * 3; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(-width * 2, gy);
        ctx.lineTo(width * 3, gy);
        ctx.stroke();
      }

      // 1. Draw Links
      currentLinks.forEach(l => {
        const s = currentNodes.find(n => n.id === l.sourceId);
        const t = currentNodes.find(n => n.id === l.targetId);
        if (!s || !t) return;

        const isHighlighted = selectedNodeId && (l.sourceId === selectedNodeId || l.targetId === selectedNodeId);
        const isFaded = selectedNodeId && !isHighlighted;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);

        if (isHighlighted) {
          ctx.strokeStyle = '#9333EA';
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = 0.95;
        } else if (isFaded) {
          ctx.strokeStyle = '#CBD5E1';
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.18;
        } else {
          ctx.strokeStyle = '#CBD5E1';
          ctx.lineWidth = 1.4;
          ctx.globalAlpha = 0.65;
        }
        ctx.stroke();

        // Draw relationship label on link midpoint
        if (!isFaded && l.label) {
          const midX = (s.x + t.x) / 2;
          const midY = (s.y + t.y) / 2;

          ctx.font = '600 10px Inter, sans-serif';
          const textMetrics = ctx.measureText(l.label);
          const bgWidth = textMetrics.width + 10;
          const bgHeight = 16;

          ctx.fillStyle = isHighlighted ? '#F3E8FF' : '#FFFFFF';
          ctx.strokeStyle = isHighlighted ? '#C084FC' : '#E2E8F0';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(midX - bgWidth / 2, midY - bgHeight / 2, bgWidth, bgHeight, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = isHighlighted ? '#7E22CE' : '#64748B';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(l.label, midX, midY);
        }

        ctx.restore();
      });

      // 2. Draw Nodes
      currentNodes.forEach(n => {
        const isSelected = n.id === selectedNodeId;
        const isConnected = connectedNodeIds.has(n.id);
        const isFaded = selectedNodeId && !isConnected;

        const typeInfo = NODE_TYPES[n.type.toUpperCase()] || NODE_TYPES.ROLE;
        const radius = n.type === 'role' ? 32 : 25;

        ctx.save();
        ctx.globalAlpha = isFaded ? 0.22 : 1.0;

        // Selected Outer Pulsing / Glowing Ring
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(147, 51, 234, 0.25)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = '#9333EA';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (isConnected && selectedNodeId) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = typeInfo.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Inner Circle Fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = typeInfo.bg;
        ctx.fill();
        ctx.strokeStyle = typeInfo.color;
        ctx.lineWidth = isSelected ? 3.5 : 2;
        ctx.stroke();

        // Draw Icon shape or First Letter Badge
        ctx.fillStyle = typeInfo.color;
        ctx.font = `800 ${n.type === 'role' ? '15px' : '12px'} Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Symbol based on node type
        let symbol = '★';
        if (n.type === 'role') symbol = '🎯';
        else if (n.type === 'job') symbol = '💼';
        else if (n.type === 'skill') symbol = '⚡';
        else if (n.type === 'course') symbol = '🎓';
        else if (n.type === 'company') symbol = '🏢';
        else if (n.type === 'govt') symbol = '🏛️';

        ctx.fillText(symbol, n.x, n.y - (n.type === 'role' ? 2 : 1));

        // Draw Node Text Label Below Node
        ctx.font = `${isSelected ? '800 12px' : '600 11px'} Inter, sans-serif`;
        const labelText = n.label;
        const textWidth = ctx.measureText(labelText).width;
        const labelBgW = textWidth + 12;
        const labelBgH = 20;
        const labelY = n.y + radius + 14;

        ctx.fillStyle = isSelected ? '#9333EA' : '#FFFFFF';
        ctx.strokeStyle = isSelected ? '#9333EA' : '#EAE2F8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(n.x - labelBgW / 2, labelY - labelBgH / 2, labelBgW, labelBgH, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isSelected ? '#FFFFFF' : '#2D1B4E';
        ctx.fillText(labelText, n.x, labelY);

        ctx.restore();
      });

      ctx.restore();

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [selectedNodeId]);

  // Convert Mouse Screen Pos to Canvas World Pos
  const getCanvasCoords = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const screenX = clientX - rect.left;
    const screenY = clientY - rect.top;

    const { x, y, k } = transformRef.current;
    const worldX = (screenX - x) / k;
    const worldY = (screenY - y) / k;

    return { screenX, screenY, worldX, worldY };
  };

  // Find node under mouse
  const findNodeAtCoords = (worldX, worldY) => {
    return nodesRef.current.find(n => {
      const radius = n.type === 'role' ? 32 : 25;
      const dx = worldX - n.x;
      const dy = worldY - n.y;
      return Math.sqrt(dx * dx + dy * dy) <= radius + 6;
    });
  };

  // Mouse Handlers
  const handleMouseDown = (e) => {
    const { screenX, screenY, worldX, worldY } = getCanvasCoords(e);
    const clickedNode = findNodeAtCoords(worldX, worldY);

    if (clickedNode) {
      draggedNode.current = clickedNode;
      onSelectNode(clickedNode.id);
    } else {
      isDraggingCanvas.current = true;
      dragStart.current = { x: screenX - transformRef.current.x, y: screenY - transformRef.current.y };
    }
  };

  const handleMouseMove = (e) => {
    const { screenX, screenY, worldX, worldY } = getCanvasCoords(e);

    if (draggedNode.current) {
      draggedNode.current.x = worldX;
      draggedNode.current.y = worldY;
      draggedNode.current.vx = 0;
      draggedNode.current.vy = 0;
      return;
    }

    if (isDraggingCanvas.current) {
      transformRef.current.x = screenX - dragStart.current.x;
      transformRef.current.y = screenY - dragStart.current.y;
      return;
    }

    // Hover Tooltip
    const hoveredNode = findNodeAtCoords(worldX, worldY);
    if (hoveredNode) {
      const connectedCount = linksRef.current.filter(l => l.sourceId === hoveredNode.id || l.targetId === hoveredNode.id).length;
      setTooltip({
        x: screenX,
        y: screenY,
        node: hoveredNode,
        connections: connectedCount
      });
    } else {
      setTooltip(null);
    }
  };

  const handleMouseUp = () => {
    draggedNode.current = null;
    isDraggingCanvas.current = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
    zoomBy(zoomFactor);
  };

  const zoomBy = (factor) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    const newK = Math.min(Math.max(0.4, transformRef.current.k * factor), 2.5);
    const centerScreenX = width / 2;
    const centerScreenY = height / 2;

    const newX = centerScreenX - (centerScreenX - transformRef.current.x) * (newK / transformRef.current.k);
    const newY = centerScreenY - (centerScreenY - transformRef.current.y) * (newK / transformRef.current.k);

    transformRef.current = { x: newX, y: newY, k: newK };
    setZoomLevel(Math.round(newK * 100) / 100);
  };

  const resetZoom = () => {
    transformRef.current = { x: 0, y: 0, k: 1 };
    setZoomLevel(1);
  };

  const relayoutGraph = () => {
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;

    nodesRef.current.forEach((n, i) => {
      const angle = (i / nodesRef.current.length) * 2 * Math.PI;
      const radius = n.type === 'role' ? 80 : 180 + (i % 3) * 60;
      n.x = width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 40;
      n.y = height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 40;
      n.vx = 0;
      n.vy = 0;
    });
    resetZoom();
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '620px',
        background: '#FAF8FE',
        borderRadius: '20px',
        border: '1px solid #EAE2F8',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 10px rgba(147, 51, 234, 0.03)'
      }}
    >
      {/* Floating Canvas Controls */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 10,
          display: 'flex',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          padding: '6px 12px',
          borderRadius: '24px',
          border: '1px solid #EAE2F8',
          boxShadow: '0 4px 14px rgba(147, 51, 234, 0.08)',
          alignItems: 'center'
        }}
      >
        <button
          onClick={() => zoomBy(1.2)}
          title="Zoom In"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#9333EA', padding: '4px' }}
        >
          <ZoomIn size={18} />
        </button>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2D1B4E', minWidth: '42px', textAlign: 'center' }}>
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={() => zoomBy(0.8)}
          title="Zoom Out"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#9333EA', padding: '4px' }}
        >
          <ZoomOut size={18} />
        </button>
        <div style={{ height: '16px', width: '1px', background: '#EAE2F8', margin: '0 2px' }} />
        <button
          onClick={resetZoom}
          title="Reset Zoom"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#7A6F8A', padding: '4px' }}
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={relayoutGraph}
          title="Re-layout Graph Physics"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#7A6F8A', padding: '4px' }}
        >
          <Play size={16} />
        </button>
      </div>

      {/* Floating Legend Badge Top Right */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 10,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          padding: '8px 14px',
          borderRadius: '16px',
          border: '1px solid #EAE2F8',
          boxShadow: '0 4px 14px rgba(147, 51, 234, 0.08)',
          maxWidth: '400px'
        }}
      >
        {Object.values(NODE_TYPES).map(type => (
          <div key={type.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: 600, color: '#2D1B4E' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: type.color }} />
            {type.label}
          </div>
        ))}
      </div>

      {/* Expand Network Floating Button Bottom Left */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          zIndex: 10
        }}
      >
        <button
          onClick={onToggleExpand}
          className="btn-secondary"
          style={{
            background: isExpanded ? '#F3E8FF' : '#FFFFFF',
            borderColor: isExpanded ? '#9333EA' : '#EAE2F8',
            color: isExpanded ? '#9333EA' : '#2D1B4E',
            fontSize: '0.85rem',
            padding: '8px 16px'
          }}
        >
          <Maximize2 size={15} />
          <span>{isExpanded ? 'Collapse Network' : 'Expand Network (+More Links)'}</span>
        </button>
      </div>

      {/* HTML Canvas Component */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        style={{ width: '100%', height: '100%', cursor: draggedNode.current ? 'grabbing' : isDraggingCanvas.current ? 'move' : 'default' }}
      />

      {/* Hover Tooltip Overlay */}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: `${tooltip.x + 12}px`,
            top: `${tooltip.y - 12}px`,
            zIndex: 100,
            pointerEvents: 'none',
            background: '#FFFFFF',
            border: `1.5px solid ${NODE_TYPES[tooltip.node.type.toUpperCase()]?.color || '#9333EA'}`,
            borderRadius: '12px',
            padding: '8px 14px',
            boxShadow: '0 8px 24px rgba(45, 27, 78, 0.15)',
            transform: 'translateY(-100%)',
            maxWidth: '220px'
          }}
        >
          <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: NODE_TYPES[tooltip.node.type.toUpperCase()]?.color }}>
            {NODE_TYPES[tooltip.node.type.toUpperCase()]?.label}
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2D1B4E', marginTop: '2px' }}>
            {tooltip.node.label}
          </div>
          {tooltip.node.shortDesc && (
            <p style={{ fontSize: '0.76rem', color: '#7A6F8A', marginTop: '4px', lineHeight: '1.3' }}>
              {tooltip.node.shortDesc.substring(0, 70)}...
            </p>
          )}
          <div style={{ marginTop: '6px', fontSize: '0.72rem', color: '#9333EA', fontWeight: 700 }}>
            🔗 {tooltip.connections} connected node{tooltip.connections === 1 ? '' : 's'}
          </div>
        </div>
      )}
    </div>
  );
}
