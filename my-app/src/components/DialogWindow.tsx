import { Dialog } from "@headlessui/react";
interface DialogWindowProps {
    backToProductList: () => void
    isDialogOpen: boolean
    setIsDialogOpen: (isDialogOpen: boolean) => void
}
const DialogWindow: React.FC<DialogWindowProps> = ({backToProductList, isDialogOpen, setIsDialogOpen}) => {
    return(
        <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            className={
              "fixed top-1/2 left-1/2 -translate-x-1/2 z-50 -translate-y-1/2 w-[350px] h-[200px] rounded-3xl bg-black text-white p-4 flex flex-col justify-between"
            }
          >
            <Dialog.Title className={"text-2xl font-bold text-center"}>
              <div className="text-center">
                Вы точно хотите покинуть эту страницу?
              </div>
            </Dialog.Title>
            <Dialog.Panel className={"flex flex-row justify-end gap-4 mt-4"}>
              <button
                className="bg-white text-black rounded py-2 px-4"
                onClick={() => setIsDialogOpen(false)}
              >
                Нет
              </button>
              <button
                className=" bg-red-500 text-white rounded py-2 px-4 "
                onClick={backToProductList}
              >
                Да
              </button>
            </Dialog.Panel>
          </Dialog>
    )
}
export default DialogWindow;