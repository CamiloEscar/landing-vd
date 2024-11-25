import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ServiceRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    email: '',
    documento: '',
    telefono: '',
    plan: '',
  });

  const [files, setFiles] = useState({
    comprobante: null as File | null,
    factura: null as File | null,
    documentoFoto: null as File | null,
    firma: null as File | null
  });

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ALT-${timestamp}-${randomPart}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof files) => {
    const file = e.target.files?.[0];
    setFiles(prev => ({...prev, [fileType]: file}));
  };

  const handleSubmit = () => {
    const requiredFields = [
      'nombre', 'apellido', 'direccion', 'email', 
      'documento', 'plan'
    ];

    const requiredFiles = [
      'comprobante', 'factura', 'documentoFoto', 'firma'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    const missingFiles = requiredFiles.filter(file => !files[file]);

    if (missingFields.length > 0 || missingFiles.length > 0) {
      alert('Por favor complete todos los campos y suba todos los archivos requeridos');
      return;
    }

    const uniqueId = generateUniqueId();

    const fullSubmission = {
      ...formData,
      id: uniqueId,
      files: {
        comprobante: files.comprobante?.name,
        factura: files.factura?.name,
        documentoFoto: files.documentoFoto?.name,
        firma: files.firma?.name
      }
    };

    console.log('Submission:', fullSubmission);
    alert(`Registro exitoso. Su ID de seguimiento es: ${uniqueId}`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Alta de Servicio</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Input 
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
        <Input 
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleInputChange}
        />
        <Input 
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleInputChange}
        />
        <Input 
          name="email"
          type="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input 
          name="documento"
          placeholder="Número de Documento"
          value={formData.documento}
          onChange={handleInputChange}
        />
        <Input 
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleInputChange}
        />
        
        <Select 
          value={formData.plan} 
          onValueChange={(value) => setFormData(prev => ({...prev, plan: value}))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basico">Plan Básico</SelectItem>
            <SelectItem value="intermedio">Plan Intermedio</SelectItem>
            <SelectItem value="premium">Plan Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div>
          <label>Comprobante de Pago</label>
          <Input 
            type="file" 
            onChange={(e) => handleFileChange(e, 'comprobante')}
          />
        </div>
        <div>
          <label>Factura</label>
          <Input 
            type="file" 
            onChange={(e) => handleFileChange(e, 'factura')}
          />
        </div>
        <div>
          <label>Foto de Documento</label>
          <Input 
            type="file" 
            onChange={(e) => handleFileChange(e, 'documentoFoto')}
          />
        </div>
        <div>
          <label>Firma</label>
          <Input 
            type="file" 
            onChange={(e) => handleFileChange(e, 'firma')}
          />
        </div>
      </div>

      <Button 
        onClick={handleSubmit} 
        className="w-full mt-6"
      >
        Registrar Servicio
      </Button>
    </div>
  );
};

export default ServiceRegistration;