import React from 'react';
import { FaWhatsapp } from "react-icons/fa";


function LiveChat() {
  return (
<a
  href="https://wa.me/2348142861009"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-5 right-5 z-50"
>
  <div className="flex items-center gap-2 bg-white shadow-xl rounded-full px-3 py-2 border border-gray-200">
    <FaWhatsapp
      className="text-green-500"
      size={30}
      className="animate-bounce"
      className="float"
    />

    <div>
      <p className="font-bold text-sm text-red-500">
        Live Chat with Selina
      </p>
    </div>
  </div>
</a>

  );
}

export default LiveChat;
