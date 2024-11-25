"use client";

import React, { useState } from "react";
import {
  Wifi,
  Tv,
  Check,
  MonitorPlay,
  Package,
  Info,
  Building2,
  Plus,
  X,
  Film,
  Trophy,
  PlaySquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useTheme } from "../context/ThemeContext";

// Types remain unchanged
type PlanType = "internet" | "tv-internet" | "tv-hd" | "corporate-internet";
type AddOnType = "hbo" | "adultos" | "deportes";

interface Channel {
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface AddOn {
  id: AddOnType;
  name: string;
  icon: React.ElementType;
  description: string;
  longDescription: string;
  imageUrl: string;
  channels: Channel[];
  price?: string;
}

interface PlanFeature {
  speed: string;
  tvs?: number;
  decos?: number;
  features: string[];
  phoneNumber: string;
  whatsapp: string;
}

const PlanSummaryDialog = ({
  isOpen,
  onClose,
  plan,
  planType,
  selectedAddOns,
  onConfirm,
  isDark,
}) => {
  if (!plan) return null;

  const getFormattedPlanType = (type) => {
    const types = {
      internet: "Internet",
      "corporate-internet": "Internet Corporativo",
      "tv-internet": "TV + Internet",
      "tv-hd": "TV HD + Internet",
    };
    return types[type] || type;
  };

  const getAddOnDetails = () => {
    return selectedAddOns
      .map((addOnId) => addOns.find((a) => a.id === addOnId))
      .filter(Boolean);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Confirma tu solicitud
          </DialogTitle>
          <DialogDescription>
            Revisa los detalles de tu plan antes de consultar
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Plan Type and Speed */}
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-800/50" : "bg-gray-100"
            }`}
          >
            <h4 className="text-lg font-semibold mb-2">
              Plan {getFormattedPlanType(planType)}
            </h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Velocidad: {plan.speed}
              </p>
              {(planType === "tv-internet" || planType === "tv-hd") && (
                <>
                  <p className="flex items-center gap-2">
                    <Tv className="h-4 w-4" />
                    TVs incluidos: {plan.tvs}
                  </p>
                  {plan.decos && (
                    <p className="flex items-center gap-2">
                      <MonitorPlay className="h-4 w-4" />
                      Decodificadores HD: {plan.decos}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Features */}
          <div
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-800/50" : "bg-gray-100"
            }`}
          >
            <h4 className="text-lg font-semibold mb-2">
              Características incluidas
            </h4>
            <ul className="space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Selected Add-ons */}
          {selectedAddOns.length > 0 && (
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-800/50" : "bg-gray-100"
              }`}
            >
              <h4 className="text-lg font-semibold mb-2">
                Paquetes adicionales
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {getAddOnDetails().map((addOn) => (
                  <div key={addOn.id} className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span>{addOn.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Continuar por WhatsApp</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const plansConfig: Record<PlanType, PlanFeature[]> = {
  internet: [
    {
      speed: "65 MB",
      phoneNumber: "(3442) 45-7061",
      whatsapp: "+543442457061",
      features: [
        "Ideal para streaming HD",
        "Conexión estable",
        "Soporte técnico incluido",
        "WiFi de alta velocidad",
      ],
    },
    {
      speed: "100 MB",
      phoneNumber: "(3442) 45-7061",
      whatsapp: "+543442457061",
      features: [
        "Perfecto para gaming",
        "Streaming 4K sin interrupciones",
        "Soporte técnico prioritario",
        "WiFi de última generación",
      ],
    },
  ],
  "corporate-internet": [
    {
      speed: "100/100 MB",
      phoneNumber: "(3442) 45-7062",
      whatsapp: "+543442457062",
      features: [
        "Velocidad simétrica garantizada",
        "Conexión dedicada para empresas",
        "Soporte técnico empresarial 24/7",
        "IP fija incluida",
      ],
    },
    {
      speed: "200/200 MB",
      phoneNumber: "(3442) 45-7062",
      whatsapp: "+543442457062",
      features: [
        "Ancho de banda empresarial",
        "Conexión de alta disponibilidad",
        "Prioridad en soporte técnico",
        "Múltiples canales de comunicación",
      ],
    },
    {
      speed: "500/500 MB",
      phoneNumber: "(3442) 45-7062",
      whatsapp: "+543442457062",
      features: [
        "Máximo rendimiento empresarial",
        "Infraestructura de red empresarial",
        "Soporte VIP personalizado",
        "Redundancia y failover incluidos",
      ],
    },
  ],
  "tv-internet": [
    {
      speed: "45 MB",
      tvs: 3,
      phoneNumber: "(3442) 45-7061",
      whatsapp: "+543442457061",
      features: [
        "TV Digital hasta 3 televisores",
        "Canales nacionales e internacionales",
        "Guía de programación",
        "Internet estable",
      ],
    },
    {
      speed: "65 MB",
      tvs: 3,
      phoneNumber: "(3442) 45-7061",
      whatsapp: "+543442457061",
      features: [
        "Mayor velocidad de internet",
        "TV Digital hasta 3 televisores",
        "Canales premium incluidos",
        "Soporte prioritario",
      ],
    },
    {
      speed: "100 MB",
      tvs: 3,
      phoneNumber: "(3442) 45-7061",
      whatsapp: "+543442457061",
      features: [
        "Máxima velocidad disponible",
        "TV Digital hasta 3 televisores",
        "Paquete completo de canales",
        "Atención VIP",
      ],
    },
  ],
  "tv-hd": [
    {
      speed: "45 MB",
      tvs: 3,
      decos: 1,
      phoneNumber: "(3442) 45-7061",
      whatsapp: "+543442457061",
      features: [
        "TV HD hasta 3 televisores",
        "1 decodificador HD incluido",
        "Calidad de imagen superior",
        "Internet estable",
      ],
    },
    {
      speed: "65 MB",
      tvs: 3,
      decos: 1,
      phoneNumber: "(3442) 45-7061",
      whatsapp: "+543442457061",
      features: [
        "Mayor velocidad de internet",
        "TV HD hasta 3 televisores",
        "1 decodificador HD incluido",
        "Canales premium en HD",
      ],
    },
    {
      speed: "100 MB",
      tvs: 3,
      decos: 1,
      phoneNumber: "(3442) 45-7061",
      whatsapp: "+543442457061",
      features: [
        "Máxima velocidad disponible",
        "TV HD hasta 3 televisores",
        "1 decodificador HD incluido",
        "Experiencia premium completa",
      ],
    },
  ],
};

const addOns: AddOn[] = [
  {
    id: "hbo",
    name: "HBO",
    icon: MonitorPlay,
    description: "Accede a todo el contenido de HBO",
    longDescription:
      "Disfruta del mejor contenido premium con HBO. Series exclusivas, películas de estreno y contenido original.",
    imageUrl: "/logos/patchera.jpg",
    channels: [
      {
        name: "HBO",
        description: "Canal principal de HBO",
        icon: <Film className="h-4 w-4" />,
      },
      {
        name: "HBO 2",
        description: "Más películas y series de HBO",
        icon: <Film className="h-4 w-4" />,
      },
      {
        name: "HBO Plus",
        description: "Contenido adicional de HBO",
        icon: <Film className="h-4 w-4" />,
      },
      {
        name: "HBO Family",
        description: "Contenido familiar de HBO",
        icon: <PlaySquare className="h-4 w-4" />,
      },
      {
        name: "HBO Signature",
        description: "Lo mejor de HBO",
        icon: <Film className="h-4 w-4" />,
      },
      {
        name: "HBO Mundi",
        description: "Películas internacionales",
        icon: <Film className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "deportes",
    name: "Deportes",
    icon: Tv,
    description: "Todos los deportes en vivo",
    longDescription:
      "No te pierdas ningún partido con nuestro paquete deportivo. Fútbol nacional e internacional, tenis, básquet y mucho más.",
    imageUrl: "/logos/patchera.jpg",
    channels: [
      {
        name: "ESPN",
        description: "Deportes internacionales",
        icon: <Trophy className="h-4 w-4" />,
      },
      {
        name: "ESPN 2",
        description: "Más deportes en vivo",
        icon: <Trophy className="h-4 w-4" />,
      },
      {
        name: "ESPN 3",
        description: "Deportes alternativos",
        icon: <Trophy className="h-4 w-4" />,
      },
      {
        name: "Fox Sports",
        description: "Deportes en vivo",
        icon: <Trophy className="h-4 w-4" />,
      },
      {
        name: "Fox Sports 2",
        description: "Más deportes",
        icon: <Trophy className="h-4 w-4" />,
      },
      {
        name: "Fox Sports 3",
        description: "Deportes complementarios",
        icon: <Trophy className="h-4 w-4" />,
      },
      // {
      //   name: "TyC Sports",
      //   description: "Deportes nacionales",
      //   icon: <Trophy className="h-4 w-4" />,
      // },
    ],
  },
  {
    id: "adultos",
    name: "Adultos",
    icon: Package,
    description: "Canales para adultos",
    longDescription:
      "Paquete de entretenimiento para adultos con contenido exclusivo las 24 horas.",
    imageUrl: "/logos/patchera.jpg",
    channels: [
      {
        name: "Venus",
        description: "Canal de entretenimiento adulto",
        icon: <Package className="h-4 w-4" />,
      },
      {
        name: "Playboy TV",
        description: "Entretenimiento adulto premium",
        icon: <Package className="h-4 w-4" />,
      },
      {
        name: "Sextreme",
        description: "Canal adulto",
        icon: <Package className="h-4 w-4" />,
      },
    ],
  },
];

const AddOnDialog = ({
  addOn,
  isSelected,
  onToggle,
  isDark,
}: {
  addOn: AddOn;
  isSelected: boolean;
  onToggle: () => void;
  isDark: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const AddonIcon = addOn.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isSelected ? "default" : "outline"}
          className={`h-auto py-4 ${
            isSelected
              ? "bg-blue-600 text-white"
              : `${
                  isDark
                    ? "text-gray-300 border-gray-700"
                    : "text-gray-600 border-gray-200"
                }`
          } flex items-center justify-between gap-4 w-full`}
        >
          <div className="flex items-center gap-3">
            <AddonIcon className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">{addOn.name}</div>
              <div className="text-sm opacity-80">{addOn.description}</div>
            </div>
          </div>
          {isSelected ? (
            <X className="h-5 w-5" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AddonIcon className="h-6 w-6" />
            {addOn.name}
          </DialogTitle>
          <DialogDescription>{addOn.longDescription}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Preview Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={addOn.imageUrl}
              alt={`${addOn.name} preview`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Channels List */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Canales Incluidos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addOn.channels.map((channel, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg ${
                    isDark
                      ? "bg-gray-800/50 hover:bg-gray-800/70"
                      : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    {channel.icon}
                    <div>
                      <h5 className="font-medium">{channel.name}</h5>
                      <p className="text-sm text-gray-500">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={() => {
              onToggle();
              setIsOpen(false);
            }}
            className="w-full"
          >
            {isSelected ? "Quitar Paquete" : "Agregar Paquete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const cardBackgrounds = [
  "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
  "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
];

export default function EnhancedPlans() {
  const { resolvedTheme } = useTheme();
  const [selectedType, setSelectedType] = useState<PlanType>("internet");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnType[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const isDark = resolvedTheme === "dark";

  const handleWhatsApp = (
    whatsapp: string,
    plan: PlanFeature,
    planType: PlanType,
    selectedAddOns: AddOnType[]
  ) => {
    let message = `Hola, me interesa conocer más sobre el plan ${planType} con las siguientes características:\n\n`;

    // Add plan speed
    message += `- Velocidad: ${plan.speed}\n`;

    // Add TV features if applicable
    if (planType === "tv-internet" || planType === "tv-hd") {
      message += `- TVs incluidos: ${plan.tvs}\n`;
      if (plan.decos) {
        message += `- Decodificadores HD: ${plan.decos}\n`;
      }
    }

    // Add selected add-ons if any
    if (selectedAddOns.length > 0) {
      message += "\nPaquetes adicionales seleccionados:\n";
      selectedAddOns.forEach((addOnId) => {
        const addOn = addOns.find((a) => a.id === addOnId);
        if (addOn) {
          message += `- ${addOn.name}\n`;
        }
      });
    }

    // // Add features
    // message += "\nCaracterísticas incluidas:\n";
    // plan.features.forEach((feature) => {
    //   message += `- ${feature}\n`;
    // });

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the encoded message
    window.open(`https://wa.me/${whatsapp}?text=${encodedMessage}`, "_blank");
  };

  const toggleAddOn = (addOnId: AddOnType) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowSummary(true);
  };

  const handleConfirmation = () => {
    if (selectedPlan) {
      handleWhatsApp(
        selectedPlan.whatsapp,
        selectedPlan,
        selectedType,
        selectedAddOns
      );
    }
    setShowSummary(false);
  };

  return (
    <div
      className={`relative ${
        isDark
          ? "bg-gradient-to-b from-gray-900 to-black"
          : "bg-gradient-to-b from-gray-100 to-white"
      } py-24`}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              isDark ? "white" : "black"
            } 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            className={`text-4xl font-extrabold ${
              isDark ? "text-white" : "text-gray-900"
            } sm:text-5xl`}
          >
            Nuestros Planes
          </h2>
          <p
            className={`mt-4 max-w-2xl mx-auto text-xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Elige el plan perfecto para tu hogar
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="bg-white/10 backdrop-blur-lg p-1 rounded-lg inline-flex gap-2">
            <Button
              onClick={() => setSelectedType("internet")}
              variant={selectedType === "internet" ? "default" : "ghost"}
              className={`flex items-center gap-2 ${
                selectedType === "internet"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Wifi className="h-5 w-5" />
              <span>Solo Internet</span>
            </Button>
            <Button
              onClick={() => setSelectedType("corporate-internet")}
              variant={
                selectedType === "corporate-internet" ? "default" : "ghost"
              }
              className={`flex items-center gap-2 ${
                selectedType === "corporate-internet"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Building2 className="h-5 w-5" />
              <span>Internet Corporativo</span>
            </Button>
            <Button
              onClick={() => setSelectedType("tv-internet")}
              variant={selectedType === "tv-internet" ? "default" : "ghost"}
              className={`flex items-center gap-2 ${
                selectedType === "tv-internet"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Tv className="h-5 w-5" />
              <span>TV + Internet</span>
            </Button>
            <Button
              onClick={() => setSelectedType("tv-hd")}
              variant={selectedType === "tv-hd" ? "default" : "ghost"}
              className={`flex items-center gap-2 ${
                selectedType === "tv-hd"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <MonitorPlay className="h-5 w-5" />
              <span>TV HD + Internet</span>
            </Button>
          </div>
        </div>

        {/* Add-ons Section */}
        {(selectedType === "tv-internet" || selectedType === "tv-hd") && (
          <div className="mt-8">
            <h3
              className={`text-2xl font-bold text-center ${
                isDark ? "text-white" : "text-gray-900"
              } mb-6`}
            >
              Paquetes Adicionales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {addOns.map((addon) => (
                <AddOnDialog
                  key={addon.id}
                  addOn={addon}
                  isSelected={selectedAddOns.includes(addon.id)}
                  onToggle={() => toggleAddOn(addon.id)}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        )}

        {/* Render plans with corporate-specific styling */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plansConfig[selectedType].map((plan, index) => (
            <div
              key={`${plan.speed}-${index}`}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <Card className="relative overflow-hidden border-0 shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      cardBackgrounds[index % cardBackgrounds.length]
                    })`,
                  }}
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                <CardContent className="relative p-8">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-600/20 backdrop-blur-md rounded-xl">
                      {selectedType === "corporate-internet" ? (
                        <Building2 className="h-8 w-8 text-blue-400" />
                      ) : selectedType === "internet" ? (
                        <Wifi className="h-8 w-8 text-blue-400" />
                      ) : selectedType === "tv-hd" ? (
                        <MonitorPlay className="h-8 w-8 text-blue-400" />
                      ) : (
                        <Tv className="h-8 w-8 text-blue-400" />
                      )}
                    </div>
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-white">
                        {plan.speed}
                      </h3>
                      {selectedType === "corporate-internet" && (
                        <p className="text-sm text-gray-300">
                          Velocidad simétrica
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Existing features list */}
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="ml-3 text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Contact Dialog */}
                  <div className="mt-8 space-y-4">
                    <Dialog>
                      <Button
                        onClick={() => handlePlanSelect(plan)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {selectedType === "corporate-internet"
                          ? "Solicitar Propuesta Corporativa"
                          : "Consultar Precio"}
                      </Button>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            {selectedType === "corporate-internet"
                              ? "Propuesta Internet Corporativo"
                              : "Consulta de Precios"}
                          </DialogTitle>
                          <DialogDescription>
                            {selectedType === "corporate-internet"
                              ? "Nuestro equipo de ventas empresariales preparará una solución a medida para tu empresa."
                              : "Contacta con nuestro equipo de ventas para conocer los precios disponibles en tu zona."}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                          <p className="text-sm text-gray-500">
                            Llámanos al:{" "}
                            <span className="font-medium">
                              {plan.phoneNumber}
                            </span>
                          </p>
                          <p className="text-sm text-gray-500">
                            O escríbenos por WhatsApp para recibir información
                            personalizada.
                          </p>
                          <Button
                            onClick={() =>
                              handleWhatsApp(
                                plan.whatsapp,
                                plan,
                                selectedType,
                                selectedAddOns
                              )
                            }
                          >
                            Contactar por WhatsApp
                          </Button>

                          {/* Agregar el diálogo de confirmación */}
                          <PlanSummaryDialog
                            isOpen={showSummary}
                            onClose={() => setShowSummary(false)}
                            plan={selectedPlan}
                            planType={selectedType}
                            selectedAddOns={selectedAddOns}
                            onConfirm={handleConfirmation}
                            isDark={isDark}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Agregar el diálogo de confirmación fuera del map */}
        {selectedPlan && (
          <PlanSummaryDialog
            isOpen={showSummary}
            onClose={() => {
              setShowSummary(false);
              setSelectedPlan(null);
            }}
            plan={selectedPlan}
            planType={selectedType}
            selectedAddOns={selectedAddOns}
            onConfirm={handleConfirmation}
            isDark={isDark}
          />
        )}

        {/* Footer Information */}
        <div className="mt-16 text-center">
          <div
            className={`inline-flex items-center gap-2 ${
              isDark ? "bg-white/10" : "bg-gray-100"
            } backdrop-blur-lg rounded-lg px-4 py-2`}
          >
            <Info className="h-5 w-5 text-blue-400" />
            <span className={isDark ? "text-gray-300" : "text-gray-600"}>
              Consulta con nuestro equipo de ventas los costos de instalación
              según tu zona
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Medios de pago: Pago Mis Cuentas (Red Banelco), Entre Ríos
            Servicios,
            <br />
            Tarjeta de Crédito Visa o Master, Débito Directo por CBU
          </p>
        </div>
      </div>
    </div>
  );
}
