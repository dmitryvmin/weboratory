exports.seed = function(knex) {
  return knex("posts")
    .del()
    .then(() => {
      return knex("posts").insert([
        {
          title: "title1",
          content:
            "Lorem ipsum dolor sit amet, ad quo eripuit propriae mnesarchum, dicant assentior has in, ut vim dicant ceteros. At nec melius impetus suscipit, sed ei partem inermis, sea esse bonorum indoctum eu. Id quidam vivendum duo, nec an iuvaret consulatu. Ut mei reque laudem labitur. Usu ad postea lucilius perpetua, ut vitae accumsan pertinacia duo.",
        },
        {
          title: "title2",
          content:
            "Eros solet commodo ne has, malis labore vix ei, duo id prima adhuc idque. Vim ex integre eruditi, id pri discere scaevola. An duo consul offendit inciderint, affert invidunt et ius. Nemore detracto verterem vix no, ut quas tamquam dissentiunt his, iracundia voluptatum repudiandae mel ne. Agam case intellegebat ea per. Lorem persius in nec, wisi antiopam principes per cu, ut natum dictas quo.",
        },
      ]);
    });
};
