'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CategoryColumn } from "./columns"
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modals/AlertModal";

interface CellActionProps {
    data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/category/${data?.id}`);
            toast({
                description: "Categoria excluida.",
            });
            router.refresh();
            // router.push(`/categories`);
            setOpen(false);
        } catch(error) {
            toast({
                variant: "destructive",
                description: "Algo deu errado.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menu aberto</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Ações
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push(`/categories/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Atualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}