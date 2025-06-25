import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDeleteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
}

export function ConfirmDeleteDialog({
    open,
    onOpenChange,
    onConfirm,
}: ConfirmDeleteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-80">
                <DialogHeader>
                    <DialogTitle>Confirmar exclusão</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground">
                    Tem certeza que deseja excluir este cliente? Essa ação não pode ser desfeita.
                </div>
                <DialogFooter className="pt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
