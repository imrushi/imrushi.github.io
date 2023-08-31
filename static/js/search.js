function displayResults(results, store) {
  const searchResults = document.getElementById("results");
  if (results.length) {
    let resultList = "";
    // Iterate and build result list elements
    for (const n in results) {
      const item = store[results[n].ref];
      resultList +=
        '<li><h2 class="post-title" id="search-title"><a href="' +
        item.url +
        '">' +
        item.title +
        "</a></h2>";
      resultList += '<span class="post-tags">';
      for (let tag of item.tags) {
        resultList += '#<a href="/tags/' + tag + '">' + tag + "</a>&nbsp;";
      }
      resultList += "</span>";

      resultList += "<p>" + item.content.substring(0, 150) + "...</p></li><hr>";
    }
    searchResults.innerHTML = resultList;
  } else {
    searchResults.innerHTML = "No results found.";
  }
}

// Get the query parameter(s)
const params = new URLSearchParams(window.location.search);
const query = params.get("query");

// Perform a search if there is a query
if (query) {
  // Retain the search input in the form when displaying results
  document.getElementById("search-input").setAttribute("value", query);

  const idx = lunr(function () {
    this.ref("id");
    this.field("title", {
      boost: 15,
    });
    this.field("tags", {
      boost: 12,
    });
    this.field("content", {
      boost: 10,
    });
    this.field("categories", {
      boost: 8,
    });
    this.field("keywords", {
      boost: 13,
    });

    for (const key in window.store) {
      this.add({
        id: key,
        title: window.store[key].title,
        tags: window.store[key].tags,
        content: window.store[key].content,
        categories: window.store[key].categories,
        keywords: window.store[key].keywords,
      });
    }
  });

  // Perform the search
  const results = idx.search(query);
  // Update the list with results
  displayResults(results, window.store);
}
