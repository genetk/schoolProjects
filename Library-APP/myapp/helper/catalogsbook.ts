import ICatalog from "../types/ICatalog";

export default function decrementAvailableCopies(catalogs:ICatalog[],bookId:string){

    const updatedCatalogs = catalogs.map(catalog => {
        if (catalog.bookId === bookId && catalog.availableCopies > 0) {
            return {
                ...catalog,
                availableCopies: catalog.availableCopies - 1,
            };
        }
        return catalog;
    });

    const catalogFound = catalogs.some(
        catalog => catalog.bookId === bookId && catalog.availableCopies > 0
    );

    return { updatedCatalogs, catalogFound };
}


