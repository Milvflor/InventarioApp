import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import NewLote from "../../features/lotes/NewLote";

export default function ModalEdit({ isOpen, toggle, option, item=null }) {
  return (
    <Dialog
      as="div"
      className="relative z-20"
      open={isOpen}
      onClose={() => toggle()}
    >
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full min-w-full p-2 text-center">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-600/75 duration-300 ease-in-out data-closed:opacity-0"
          />
          <DialogPanel
            transition
            className="flex-grow relative bg-white rounded-lg sm:mx-8 lg:mx-48 p-4 text-left overflow-hidden shadow-xl my-8 w-auto duration-300 ease-in-out data-closed:scale-95 data-closed:opacity-0"
          >
            {option==="editarLote" && (
              <NewLote
                title="Editar Lote"
                item={item}
              />
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
