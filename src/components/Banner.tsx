import React from "react";
import { useTheme } from "../context/ThemeContext";

interface LogoType {
  src: string;
  alt: string;
}

interface BannerProps {
  backgroundImage: string;
  title?: string;
  subtitle?: string;
  logos?: LogoType[];
  className?: string;
  overlayColor?: {
    light: string;
    dark: string;
  };
  height?: string;
  width?: string;
  titleStyle?: string;
  subtitleStyle?: string;
  // Nuevas propiedades
  logosContainerClass?: string; // Clase para el contenedor de logos
  logoClass?: string; // Clase para cada logo individual
  // Propiedades del botón
  buttonText?: string;       // Texto del botón
  buttonUrl?: string;        // URL o sección a la que redirige
  buttonStyle?: string;      // Clases adicionales para el estilo del botón
  buttonTarget?: '_self' | '_blank'; // Comportamiento del enlace (misma pestaña o nueva)
}

const Banner: React.FC<BannerProps> = ({
  backgroundImage,
  title,
  subtitle,
  logos = [],
  className = "",
  overlayColor = {
    light: "rgba(255, 255, 255, 0.8)",
    dark: "rgba(0, 0, 0, 0.7)",
  },
  height = "h-96",
  width = "w-full",
  titleStyle = "text-4xl font-bold",
  subtitleStyle = "text-xl",
  logosContainerClass='',
  logoClass='',
  buttonText='',
  buttonUrl='',
  buttonStyle='',
  buttonTarget=''
}) => {
  const { theme } = useTheme();

  return (
    <div 
  className={`relative ${height} ${width || 'w-full'} overflow-hidden ${className} 
    transition-colors duration-300`}
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Overlay */}
  <div
    className="absolute inset-0 transition-colors duration-300"
    style={{ backgroundColor: overlayColor?.[theme] }}
  ></div>

  {/* Contenido */}
  <div
    className={`relative z-10 h-full flex flex-col items-center justify-center px-4 text-center 
      ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
  >
    {title && <h2 className={`text-4xl font-bold mb-4 ${titleStyle}`}>{title}</h2>}
    {subtitle && <p className={`text-xl mb-8 ${subtitleStyle}`}>{subtitle}</p>}

    {/* Botón */}
    {buttonText && buttonUrl && (
      <a
        href={buttonUrl}
        target={buttonTarget || '_self'}
        className={`mt-6 px-6 py-3 text-lg font-medium rounded-md shadow-md 
          ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} 
          hover:opacity-90 transition-opacity ${buttonStyle || ''}`}
      >
        {buttonText}
      </a>
    )}

    {/* Grid de logos */}
    {logos && logos.length > 0 && (
      <div className={`grid grid-cols-3 md:grid-cols-6 gap-4 mt-4 ${logosContainerClass || ''}`}>
        {logos.map((logo, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-center p-2 rounded-lg shadow-sm ${logoClass || ''}`}
          >
            <img src={logo.src} alt={logo.alt} className="max-h-12 w-auto object-contain" />
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
};

export default Banner;
