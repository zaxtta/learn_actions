const main = async () => {
  const exampleUrl = "https://example.com";
  const perPage = 3;
  let maxPage = 1;
  let result = [];
  for (let page = 1; page <= maxPage; page += 1) {
    const res = await fetch(`https://render-sample-1.onrender.com/articles?page=${page}&per_page=${perPage}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "token"
      }
    });
    if (!res.ok) {
      throw new Error(res.text)
    }
    const resJson = await res.json();
    console.log('# resJson', JSON.stringify(resJson))
    result = resJson.articles.reduce((acc, cur) => {
      return [
        ...acc,
        {
          url: `${exampleUrl}/${cur.route}/${cur.slug}/`,
          refreshed_at: cur.refreshed_at
        }
      ]
    }, result);
    maxPage = (resJson.total + perPage - 1) / perPage;
  }
  result.sort((a, b) => {
    return new Date(b.refreshed_at) - new Date(a.refreshed_at);
  })
  console.log('# final result', result)
}

main();
