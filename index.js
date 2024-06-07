const main = async () => {
  const fetchUrl = "https://render-sample-1.onrender.com/articles";
  const exampleUrl = "https://example.com";
  const result = [];
  const perPage = 3;
  let maxPage = 1;
  for (let i = 0; i < maxPage; i += 1) {
    const res = await fetch(`${fetchUrl}?page=${i + 1}&per_page=${perPage}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "token"
      }
    });
    if (!res.ok) {
      throw new Error(res.text)
    }
    const resJson = await res.json();
    const data = resJson.articles.map((article) => {
      return {
        url: `${exampleUrl}/${article.route}/${article.slug}/`,
        refreshed_at: article.refreshed_at
      }
    })
    console.log(`[i: ${i}]: ${JSON.stringify(data)}`);
    result.push(...data)
    console.log('result: ', result);
    maxPage = Math.floor((resJson.total + perPage - 1) / perPage);
    console.log('maxPage: ', maxPage)
  }
  result.sort((a, b) => {
    return new Date(b.refreshed_at) - new Date(a.refreshed_at);
  })
  
  console.log('final result: ', result)
}

main();
