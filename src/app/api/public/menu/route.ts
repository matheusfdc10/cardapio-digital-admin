import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const revalidate = 0

export async function GET(
    request: Request,
) {
    try {
        const menu = await prismadb.category.findMany({
            include: {
                products: {
                    include: {
                        images: true,
                        additionalItemCategories: {
                            include: {
                                additionalItems: {
                                    orderBy: {
                                        price: "asc"
                                    }
                                }
                            },
                            orderBy: {
                                order: 'asc'
                            }
                        }
                    },
                    orderBy: {
                        price: "asc"
                    },
                },
            },
            orderBy: {
                order: 'asc'
            }
        })

        return NextResponse.json(menu);
    } catch(error) {
        console.log('[PUBLIC_MENU_GET]', error)
        return new NextResponse("Interal error", { status: 500 })
    }
}