import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Construction } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Construccion() {
  const handleConfetti = () => { 
    alert('¡Nos encanta tu entusiasmo!');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
   
  };

  return (
    <AuthenticatedLayout>
      <Head title="Página en construcción" />

      <div className="min-h-screen bg-gradient-to-r from-gray-500 to-green-300 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-2xl max-w-2xl text-center">
          {/* Animación de carga */}
          <div className="relative flex justify-center mb-6">
            <div className="loading-circle"></div>
          </div>
          <div className=' text-blue-500 mb-5 flex justify-center'>
          <Construction size={50}  />
          </div>

          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ¡Estamos trabajando en ello!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Esta página está en construcción. Vuelve pronto para descubrir algo genial.
          </p>

          <div className="space-x-4">
            <button
              onClick={handleConfetti} 
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
            >
              Clic aquí
            </button>
          </div>
        </div>
      </div>

      {/* Estilos sin el atributo jsx */}
      <style>
        {`
          .loading-circle {
            width: 96px;
            height: 96px;
            border: 8px solid #f3f3f3; /* Gris claro */
            border-top: 8px solid #3498db; /* Azul */
            border-radius: 50%;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </AuthenticatedLayout>
  );
}
