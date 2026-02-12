import React from "react";
import SEOHead from "../../../shared/components/SEOHead";
import GenericButton from "../../../shared/components/GenericButton";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {

  const navigate = useNavigate();

  // Static content as per requirements, real implementation would fetch from CMS/about.md
  const cmsContent = {
    content:
      "Mi nombre es Leilen Mateo. Vivo en Rosario, Santa Fe, y me enamoré de la fotografía cuando tenía 11 años, el día que usé mi primera cámara con rollo. Desde entonces, descubrí que lo que más disfruto es guardar recuerdos, capturar esos momentos que pasan volando… y hacer que duren para siempre.",
    content2: "Soy técnica en fotografía con una sólida experiencia en capturar momentos especiales en diversos ámbitos. Mi trayectoria abarca eventos sociales y corporativos, así como la impartición de clases online de fotografía, lo que me ha permitido desarrollar habilidades versátiles y adaptarme a diferentes contextos.Actualmente, me dedico a la fotografía de moda y publicidad, un campo que me apasiona donde busco crear imágenes impactantes y creativas que transmitan la esencia de cada proyecto. Trabajo en estrecha colaboración con modelos, estilistas y directores de arte para producir contenido visual que cumpla con los objetivos de cada campaña, combinando técnica y creatividad para contar historias a través de mis imágenes.",
    profileImage: "/images/aboutImages/profileImage.svg", // Placeholder or mapped from config
  };

  return (
    <>
      <SEOHead
        title="Soy Leilen - Conoce a la Fotógrafa | Leilen Mateo"
        description="Conoce a Leilen Mateo, fotógrafa profesional con años de experiencia. Mi historia, pasión por la fotografía y enfoque único en cada sesión."
        keywords="soy Leilen, fotógrafa Leilen Mateo, historia personal, experiencia fotográfica, pasión por la fotografía, profesional"
        url="/soy-leilen"
        image="/og-soy-leilen.jpg"
      />

      <main className="container mx-auto px-4 mt-40 min-h-screen max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center">
          {/* Columna Izquierda: Texto Editorial */}
          <div
            className=" leading-relaxed benton-modern-display pl-16"
          >
            {/* Imagen de Título Estática */}
            <img
              src="/images/aboutImages/titleImage1.svg"
              alt="¿Quién está detrás de la Cámara?"
              className="float-left mr-4 ml-[-34px] mt-[-60px]"
            />

            <p className="text-lg lg:text-xl text-justify">{cmsContent.content}</p>
            <p className="text-lg lg:text-xl text-justify">{cmsContent.content2}</p>
          </div>

          {/* Columna Derecha: Imagen de Perfil */}
          <div className="flex justify-center relative h-full">
            <img
              src={cmsContent.profileImage}
              alt="Leilen Mateo"
              className="h-full opacity-90"
            />
            <div className="absolute bottom-[-16px] left-2">
              <img src="/images/aboutImages/signatureImg1.svg" alt="Firma Leilen" className=""/>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-svh pb-20 relative">
          <div className="flex items-center justify-center h-1/2">
            <img src="/images/aboutImages/secondaryTitleImage.svg" alt="testimonios" className=""/>
          </div>
          <div className="flex items-start h-1/2 px-16">
            <p className="text-lg lg:text-3xl text-center benton-modern-display-conden italic border-t border-b border-gray-300 pt-20 pb-20">“Trabajar con Leilen ha sido una de las mejores decisiones que pude tomar para llevar adelante la sesion de mi boda, es una genia profesional”</p>
          </div>
          <img src="/images/aboutImages/phraseImage.svg" alt="indicador accion" className="absolute bottom-35 left-[53%]"/>
          <GenericButton
            onClick={() => navigate('/contact')}
          >
            Contactar
          </GenericButton>
        </div>
      </main>
    </>
  );
};

export default AboutPage;
