import type {StructureResolver} from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Shoper Ecommerce Website")
     //.items(S.documentTypeListItems())

    // manual code
    .items([
      S.documentTypeListItem("category").title("Categories"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post','category','author'].includes(item.getId()!)
      ),
    ]);
