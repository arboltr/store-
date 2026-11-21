"use client";

import React, { useState, useMemo } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  rawPrice: number;
  tipologia: string;
  colors: string[];
  sizes: string[];
  imageUrl: string;
  hoverImageUrl: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Camiseta Tye Die de tul",
    price: "9,99 €",
    rawPrice: 9.99,
    tipologia: "Estampadas",
    colors: ["Negro", "Blanco"],
    sizes: ["XS", "S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Camiseta con manga asi...",
    price: "12,99 €",
    rawPrice: 12.99,
    tipologia: "Tops",
    colors: ["Negro", "Blanco"],
    sizes: ["S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Camiseta manga larga",
    price: "12,99 €",
    rawPrice: 12.99,
    tipologia: "Manga Larga",
    colors: ["Negro", "Rojo"],
    sizes: ["XS", "S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Camiseta con cuello pico",
    price: "5,99 €",
    rawPrice: 5.99,
    tipologia: "Básicas",
    colors: ["Blanco", "Gris", "Negro"],
    sizes: ["XS", "S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    name: "Camiseta de canalé con frente",
    price: "12,99 €",
    rawPrice: 12.99,
    tipologia: "Básicas",
    colors: ["Blanco", "Camel", "Negro"],
    sizes: ["XS", "S", "M"],
    imageUrl:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    name: "Camiseta cropped con d...",
    price: "12,99 €",
    rawPrice: 12.99,
    tipologia: "Tops",
    colors: ["Rojo", "Rosa"],
    sizes: ["XS", "S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    name: "Camiseta con drapeado",
    price: "12,99 €",
    rawPrice: 12.99,
    tipologia: "Manga Larga",
    colors: ["Negro", "Azul"],
    sizes: ["S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    name: "Camiseta con mensaje",
    price: "7,99 €",
    rawPrice: 7.99,
    tipologia: "Con mensaje",
    colors: ["Blanco", "Amarillo"],
    sizes: ["XS", "S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 9,
    name: "Camiseta tirantes rib",
    price: "8,99 €",
    rawPrice: 8.99,
    tipologia: "Playeras",
    colors: ["Camel", "Blanco", "Negro"],
    sizes: ["XS", "S", "M"],
    imageUrl:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 10,
    name: "Camiseta manga corta lisa",
    price: "9,99 €",
    rawPrice: 9.99,
    tipologia: "Manga Corta",
    colors: ["Verde", "Blanco", "Negro"],
    sizes: ["S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 11,
    name: "Top asimétrico escote",
    price: "15,99 €",
    rawPrice: 15.99,
    tipologia: "Tops",
    colors: ["Rosa", "Granate"],
    sizes: ["XS", "S", "M"],
    imageUrl:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 12,
    name: "Camiseta print retro",
    price: "11,99 €",
    rawPrice: 11.99,
    tipologia: "Estampadas",
    colors: ["Azul", "Amarillo"],
    sizes: ["S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=700&q=80",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
  },
];

const TIPOLOGIAS = [
  "Todos",
  "Precios especiales",
  "Básicas",
  "Estampadas",
  "Con mensaje",
  "Manga Corta",
  "Manga Larga",
  "Playeras",
  "Tops",
];

const COLORS = [
  { name: "Blanco", hex: "#FFFFFF", border: "#dcdcdc" },
  { name: "Negro", hex: "#111111" },
  { name: "Amarillo", hex: "#FFDC00" },
  { name: "Rosa", hex: "#E83E8C" },
  { name: "Camel", hex: "#D49B6A" },
  { name: "Rojo", hex: "#E51A1A" },
  { name: "Gris", hex: "#CCCCCC" },
  { name: "Verde", hex: "#4CAF50" },
  { name: "Azul", hex: "#1E88E5" },
  { name: "Granate", hex: "#6D0D27" },
];

export default function BershkaStore() {
  const [showFilters, setShowFilters] = useState(true);
  const [activeTab, setActiveTab] = useState("COLECCIÓN");
  const [selectedTipologia, setSelectedTipologia] = useState("Todos");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("Todas");
  const [sortBy, setSortBy] = useState("Popularidad");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedTipologia === "Precios especiales") {
        if (p.rawPrice >= 12.0) return false;
      } else if (selectedTipologia !== "Todos") {
        if (p.tipologia !== selectedTipologia) return false;
      }

      if (selectedColor && !p.colors.includes(selectedColor)) {
        return false;
      }

      if (selectedSize !== "Todas" && !p.sizes.includes(selectedSize)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "Precio: menor a mayor") return a.rawPrice - b.rawPrice;
      if (sortBy === "Precio: mayor a menor") return b.rawPrice - a.rawPrice;
      return a.id - b.id;
    });
  }, [selectedTipologia, selectedColor, selectedSize, sortBy]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#111111",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* 1. TOP HEADER */}
      <header
        style={{
          width: "100%",
          borderBottom: "1px solid #ebebeb",
          backgroundColor: "#ffffff",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 20px",
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div>
            <a
              href="#"
              style={{
                fontSize: "21px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#000000",
                textDecoration: "none",
              }}
            >
              Bershka
            </a>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {[
              { id: "NOVEDADES", label: "Novedades" },
              { id: "COLECCIÓN", label: "Colección" },
              { id: "REBAJAS", label: "Rebajas", isSale: true },
              { id: "STORIES", label: "Stories" },
              { id: "JOIN LIFE", label: "Join Life" },
              { id: "#BERSHKASTYLE", label: "#Bershkastyle" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: tab.isSale ? "#ff3e6c" : "#000000",
                    background: "none",
                    border: "none",
                    padding: "16px 0",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  {tab.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        backgroundColor: "#000000",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Minimal right icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ cursor: "pointer", opacity: 0.8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <span style={{ cursor: "pointer", opacity: 0.8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </span>
          </div>
        </div>
      </header>

      {/* 2. SUB-TOOLBAR */}
      <div style={{ width: "100%", backgroundColor: "#ffffff", paddingTop: "14px", paddingBottom: "12px" }}>
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11px",
            color: "#222222",
          }}
        >
          {/* Left: Ocultar filtros */}
          <div style={{ width: "185px", flexShrink: 0 }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                padding: 0,
                fontSize: "11px",
                color: "#111111",
                cursor: "pointer",
              }}
            >
              <span>{showFilters ? "Ocultar filtros" : "Mostrar filtros"}</span>
              <span style={{ fontSize: "8px", color: "#777777" }}>
                {showFilters ? "▲" : "▼"}
              </span>
            </button>
          </div>

          {/* Center: Breadcrumbs */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#777777" }}>
            <span style={{ fontWeight: 600, color: "#000000" }}>Mujer</span>
            <span style={{ color: "#cccccc", fontSize: "10px" }}>&gt;</span>
            <span style={{ cursor: "pointer" }}>Colección</span>
            <span style={{ color: "#cccccc", fontSize: "10px" }}>&gt;</span>
            <span style={{ color: "#111111" }}>Camisetas</span>
          </div>

          {/* Right: Ordenar */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: "#777777" }}>Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "11px",
                color: "#111111",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <option value="Popularidad">Popularidad</option>
              <option value="Precio: menor a mayor">Precio: menor a mayor</option>
              <option value="Precio: mayor a menor">Precio: mayor a menor</option>
            </select>
            <span style={{ fontSize: "8px", color: "#777777" }}>▼</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN CATALOG */}
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 20px 60px 20px",
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
        }}
      >
        {/* SIDEBAR FILTERS */}
        {showFilters && (
          <aside
            style={{
              width: "185px",
              flexShrink: 0,
              userSelect: "none",
              fontSize: "11px",
              color: "#333333",
            }}
          >
            {/* Tipología */}
            <div style={{ marginBottom: "22px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                  color: "#000000",
                  marginBottom: "10px",
                }}
              >
                <span>Tipología</span>
                <span style={{ fontSize: "8px", color: "#888888" }}>▲</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {TIPOLOGIAS.map((tipo) => {
                  const isSelected = selectedTipologia === tipo;
                  return (
                    <div
                      key={tipo}
                      onClick={() => setSelectedTipologia(tipo)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        padding: "2px 0",
                      }}
                    >
                      {/* Exact 12px Radio Button */}
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          border: isSelected ? "1px solid #000000" : "1px solid #b5b5b5",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          backgroundColor: "#ffffff",
                        }}
                      >
                        {isSelected && (
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: "#000000",
                            }}
                          />
                        )}
                      </span>
                      <span
                        style={{
                          fontWeight: isSelected ? 600 : 400,
                          color: isSelected ? "#000000" : "#444444",
                        }}
                      >
                        {tipo}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Color */}
            <div style={{ marginBottom: "22px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                  color: "#000000",
                  marginBottom: "10px",
                }}
              >
                <span>Color</span>
                <span style={{ fontSize: "8px", color: "#888888" }}>▲</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "150px" }}>
                {COLORS.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(isSelected ? null : c.name)}
                      title={c.name}
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        backgroundColor: c.hex,
                        border: c.border ? `1px solid ${c.border}` : "none",
                        outline: isSelected ? "1.5px solid #000000" : "none",
                        outlineOffset: "2px",
                        cursor: "pointer",
                        padding: 0,
                        display: "inline-block",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Talla */}
            <div style={{ marginBottom: "22px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                  color: "#000000",
                  marginBottom: "10px",
                }}
              >
                <span>Talla</span>
                <span style={{ fontSize: "8px", color: "#888888" }}>▲</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {/* Todas las tallas */}
                <div
                  onClick={() => setSelectedSize("Todas")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "2px 0",
                  }}
                >
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      border: selectedSize === "Todas" ? "1px solid #000000" : "1px solid #b5b5b5",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {selectedSize === "Todas" && (
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: "#000000",
                        }}
                      />
                    )}
                  </span>
                  <span
                    style={{
                      fontWeight: selectedSize === "Todas" ? 600 : 400,
                      color: selectedSize === "Todas" ? "#000000" : "#444444",
                    }}
                  >
                    Todas las tallas
                  </span>
                </div>

                {/* XS / M / S / L */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "6px" }}>
                  {["XS", "M", "S", "L"].map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <div
                        key={sz}
                        onClick={() => setSelectedSize(isSelected ? "Todas" : sz)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                          padding: "2px 0",
                        }}
                      >
                        <span
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            border: isSelected ? "1px solid #000000" : "1px solid #b5b5b5",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            backgroundColor: "#ffffff",
                          }}
                        >
                          {isSelected && (
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor: "#000000",
                              }}
                            />
                          )}
                        </span>
                        <span
                          style={{
                            fontWeight: isSelected ? 600 : 400,
                            color: isSelected ? "#000000" : "#444444",
                          }}
                        >
                          {sz}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* 4. PRODUCT GRID (Bulletproof 4 Columns) */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {filteredProducts.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#777777", fontSize: "11px" }}>
              No se han encontrado productos con estos filtros.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: showFilters
                  ? "repeat(4, minmax(0, 1fr))"
                  : "repeat(5, minmax(0, 1fr))",
                columnGap: "14px",
                rowGap: "28px",
                width: "100%",
              }}
            >
              {filteredProducts.map((p) => {
                const isHovered = hoveredProduct === p.id;
                return (
                  <div
                    key={p.id}
                    onMouseEnter={() => setHoveredProduct(p.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    {/* Fixed aspect ratio 3:4 container */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "3 / 4",
                        backgroundColor: "#f7f7f7",
                        overflow: "hidden",
                        marginBottom: "7px",
                      }}
                    >
                      <img
                        src={isHovered ? p.hoverImageUrl : p.imageUrl}
                        alt={p.name}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                          display: "block",
                          transition: "opacity 0.25s ease",
                        }}
                      />
                    </div>

                    {/* Product Name */}
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 400,
                        color: "#222222",
                        textAlign: "center",
                        margin: "0 0 3px 0",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        padding: "0 4px",
                      }}
                      title={p.name}
                    >
                      {p.name}
                    </p>

                    {/* Product Price */}
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#000000",
                        textAlign: "center",
                        margin: 0,
                      }}
                    >
                      {p.price}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
