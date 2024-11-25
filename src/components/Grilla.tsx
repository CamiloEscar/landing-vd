"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Tv,
  Film,
  Music2,
  Gamepad2,
  Radio,
  MonitorPlay,
  LayoutGrid,
  List,
  ImageIcon,
  Baby,
  Trophy,
  BookOpen,
  Newspaper,
  Globe,
  Wheat,
  Landmark,
  Palette,
  HeartPulse,
  FileSpreadsheet,
  Printer,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import channels from "../../canales";

type ChannelCategory =
  | "todos"
  | "peliculas"
  | "deportes"
  | "musica"
  | "infantil"
  | "educativo"
  | "noticias"
  | "local"
  | "regional"
  | "general"
  | "agropecuario"
  | "documentales"
  | "peliculas_series"
  | "estilos de vida"
  | "internacional";

type SignalType = "sd" | "isdbt" | "hd";
type ViewMode = "grid" | "list";

interface ChannelNumbers {
  sd?: number;
  isdbt?: string;
  hd?: number;
}

interface Channel {
  name: string;
  logo?: string;
  category: ChannelCategory;
  numbers: ChannelNumbers;
}

const categoryIcons = {
  todos: Tv,
  peliculas: Film,
  peliculas_series: Film,
  deportes: Trophy,
  musica: Music2,
  infantil: Baby,
  educativo: BookOpen,
  noticias: Newspaper,
  local: Landmark,
  regional: Globe,
  general: LayoutGrid,
  agropecuario: Wheat,
  documentales: BookOpen,
  "estilos de vida": Palette,
  internacional: Globe,
};

const categories = Object.entries(categoryIcons).map(([id, icon]) => ({
  id,
  name: id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, " "),
  icon,
}));

const signalTypes = [
  { id: "all", name: "Todas las señales", icon: Tv },
  { id: "sd", name: "TV SD", icon: Tv, color: "text-gray-400" },
  { id: "isdbt", name: "TV ISDBT", icon: Radio, color: "text-yellow-400" },
  { id: "hd", name: "TV HD", icon: MonitorPlay, color: "text-blue-400" },
];

const generateExcel = (channels: Channel[]) => {
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["Grilla de Canales | VIDEO DIGITAL"],
    [],
    ["Nombre", "Categoría", "SD", "ISDBT", "HD"],
  ]);

  channels.forEach((channel) => {
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          channel.name,
          channel.category,
          channel.numbers.sd || "",
          channel.numbers.isdbt || "",
          channel.numbers.hd || "",
        ],
      ],
      { origin: -1 }
    );
  });

  // Estilo para el título
  worksheet["A1"].s = {
    font: { bold: true, size: 16 },
    alignment: { horizontal: "center" },
  };
  worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];

  // Estilo para los encabezados
  ["A3", "B3", "C3", "D3", "E3"].forEach((cell) => {
    worksheet[cell].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: "4F46E5" } },
      alignment: { horizontal: "center" },
    };
  });

  // Ajustar el ancho de las columnas
  const colWidths = [
    { wch: 30 },
    { wch: 20 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
  ];
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Grilla de Canales | VIDEO DIGITAL");

  return workbook;
};

const PrintableChannelList = ({ channels }: { channels: Channel[] }) => {
  return (
    <div className="print:block hidden">
      <h1 className="text-2xl font-bold mb-4">Grilla de Canales</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Nombre</th>
            <th className="border p-2 text-left">Categoría</th>
            <th className="border p-2 text-left">SD</th>
            <th className="border p-2 text-left">ISDBT</th>
            <th className="border p-2 text-left">HD</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr key={channel.name}>
              <td className="border p-2">{channel.name}</td>
              <td className="border p-2">{channel.category}</td>
              <td className="border p-2">{channel.numbers.sd || "-"}</td>
              <td className="border p-2">{channel.numbers.isdbt || "-"}</td>
              <td className="border p-2">{channel.numbers.hd || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function ChannelGrid() {
  const [selectedCategory, setSelectedCategory] =
    useState<ChannelCategory>("todos");
  const [selectedSignalType, setSelectedSignalType] = useState<
    "all" | SignalType
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const printableRef = useRef<HTMLDivElement>(null);

  const filteredChannels = channels.filter((channel) => {
    const matchesCategory =
      selectedCategory === "todos" || channel.category === selectedCategory;

    const matchesSignalType =
      selectedSignalType === "all" ||
      (selectedSignalType === "sd" && channel.numbers.sd) ||
      (selectedSignalType === "hd" && channel.numbers.hd) ||
      (selectedSignalType === "isdbt" && channel.numbers.isdbt);

    const matchesSearch =
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (selectedSignalType !== "all"
        ? channel.numbers[selectedSignalType]?.toString().includes(searchTerm)
        : Object.values(channel.numbers).some((num) =>
            num?.toString().includes(searchTerm)
          ));

    return matchesCategory && matchesSignalType && matchesSearch;
  });

  const handleDownload = () => {
    const workbook = generateExcel(filteredChannels);
    XLSX.writeFile(workbook, "grilla_canales.xlsx");
  };

  const handlePrint = () => {
    if (printableRef.current) {
      const printContent = printableRef.current.innerHTML;
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
    }
  };

  const NumberBadge = ({
    type,
    number,
  }: {
    type: SignalType;
    number?: number | string;
  }) => {
    if (!number) return null;

    const styles = {
      sd: "bg-gray-600/20 text-gray-400 border border-gray-600/30",
      isdbt: "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30",
      hd: "bg-blue-600/20 text-blue-400 border border-blue-600/30",
    };

    return (
      <div
        className={`px-2 py-1 rounded-md text-xs font-medium ${styles[type]} backdrop-blur-sm`}
      >
        {type.toUpperCase()} {number}
      </div>
    );
  };

  const ChannelNumbers = ({ numbers }: { numbers: ChannelNumbers }) => {
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {numbers.hd && <NumberBadge type="hd" number={numbers.hd} />}
        {numbers.sd && <NumberBadge type="sd" number={numbers.sd} />}
        {numbers.isdbt && <NumberBadge type="isdbt" number={numbers.isdbt} />}
      </div>
    );
  };

  const ChannelCard = ({ channel }: { channel: Channel }) => {
    const CategoryIcon = categoryIcons[channel.category] || ImageIcon;

    return (
      <Card className="relative bg-black/40 border-white/5 backdrop-blur-sm hover:bg-black/50 transition-all hover:scale-102 hover:border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
              {channel.logo ? (
                <img
                  src={channel.logo}
                  alt={`${channel.name} logo`}
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <CategoryIcon className="w-8 h-8 text-white/50" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  {channel.name}
                  <CategoryIcon className="w-4 h-4 text-white/50" />
                </h3>
              </div>
              {selectedSignalType === "all" ? (
                <ChannelNumbers numbers={channel.numbers} />
              ) : (
                channel.numbers[selectedSignalType] && (
                  <NumberBadge
                    type={selectedSignalType}
                    number={channel.numbers[selectedSignalType]}
                  />
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ChannelRow = ({ channel }: { channel: Channel }) => {
    const CategoryIcon = categoryIcons[channel.category] || ImageIcon;
    const [showDetails, setShowDetails] = useState(false);

    return (
      <div className="relative flex flex-col bg-black/40 rounded-lg hover:bg-black/50 transition-all border border-white/5 hover:border-white/10">
        <div className="flex items-center gap-4 p-4">
          <div className="relative w-20 h-10 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
            {channel.logo ? (
              <img
                src={channel.logo}
                alt={`${channel.name} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <CategoryIcon className="w-6 h-6 text-gray-500" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">{channel.name}</h3>
              {selectedSignalType === "all" && (
                <div className="flex gap-2">
                  <ChannelNumbers numbers={channel.numbers} />
                </div>
              )}
            </div>
            {selectedSignalType !== "all" &&
              channel.numbers[selectedSignalType] && (
                <div className="mt-2">
                  <NumberBadge
                    type={selectedSignalType}
                    number={channel.numbers[selectedSignalType]}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-gray-900 to-black py-24">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-repeat opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 100% 100%, transparent 25%, rgba(255,255,255,0.05) 25.5%, transparent 26%),
              radial-gradient(circle at 0% 100%, transparent 25%, rgba(255,255,255,0.05) 25.5%, transparent 26%),
              radial-gradient(circle at 100% 0%, transparent 25%, rgba(255,255,255,0.05) 25.5%, transparent 26%),
              radial-gradient(circle at 0% 0%, transparent 25%, rgba(255,255,255,0.05) 25.5%, transparent 26%)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 sm:text-6xl">
            Grilla de Canales
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Explora nuestra completa programación
          </p>
          <div className="mt-4 space-y-6 max-w-2xl mx-auto text-xl text-gray-300">
            {/* <Button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-500 text-white"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Descargar
            </Button> */}
            <Button
              onClick={handlePrint}
              className="bg-purple-600 hover:bg-purple-500 text-white"
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
          </div>
        </div>

        {/* Sección de Búsqueda, Cambio de Vista, Descarga y Filtros */}
        <div className="mt-12 space-y-6">
          <div className="flex gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nombre o número..."
                className="pl-10 bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-400/50 focus:ring-blue-400/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-1 flex gap-1 border border-white/10">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid" ? "bg-blue-600 hover:bg-blue-500" : ""
                }
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list" ? "bg-blue-600 hover:bg-blue-500" : ""
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-6">
            {/* Categories Filter */}
            <div className="flex justify-center">
              <div className="inline-flex space-x-2 bg-white/10 backdrop-blur-lg p-1 rounded-xl border border-white/10">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() =>
                      setSelectedCategory(category.id as ChannelCategory)
                    }
                    variant="ghost"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      selectedCategory === category.id
                        ? "bg-blue-600/50 text-white"
                        : "text-white/60 hover:bg-white/10"
                    }`}
                  >
                    <category.icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Signal Types Filter */}
            <div className="flex justify-center">
              <div className="inline-flex space-x-2 bg-white/10 backdrop-blur-lg p-1 rounded-xl border border-white/10">
                {signalTypes.map((type) => (
                  <Button
                    key={type.id}
                    onClick={() =>
                      setSelectedSignalType(type.id as "all" | SignalType)
                    }
                    variant="ghost"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      selectedSignalType === type.id
                        ? "bg-blue-600/50 text-white"
                        : "text-white/60 hover:bg-white/10"
                    }`}
                  >
                    <type.icon className={`h-5 w-5 ${type.color || ""}`} />
                    <span className="hidden sm:inline">{type.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Channels Display */}
        <div
          className={`mt-16 ${
            viewMode === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
          }`}
        >
          {filteredChannels.map((channel) =>
            viewMode === "grid" ? (
              <ChannelCard key={channel.name} channel={channel} />
            ) : (
              <ChannelRow key={channel.name} channel={channel} />
            )
          )}
        </div>

        {filteredChannels.length === 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
              <Search className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">
                No se encontraron canales que coincidan con tu búsqueda.
              </span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-12 flex justify-center gap-6 flex-wrap">
          {signalTypes.slice(1).map((type) => (
            <div
              key={type.id}
              className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/5"
            >
              <type.icon className={`h-4 w-4 ${type.color}`} />
              <span className="text-sm text-gray-300">{type.name}</span>
            </div>
          ))}
        </div>
        <div ref={printableRef} className="hidden">
          <PrintableChannelList channels={filteredChannels} />
        </div>
      </div>
    </div>
  );
}
