import React, { useState } from "react"
import { openDB, deleteDB, wrap, unwrap } from "idb"
import Print from "../components/print"
const IndexPage = () => {
  //Db settings
  const DB_NAME = "myDb2"
  const DB_VERSION = 2
  const DB_STORE_NAME = "tasks"

  async function fetchArticles() {
    const db = await openDB("Articles", 1)
    return await db.getAllFromIndex("articles", "date")
  }

  const SimpleList = () => (
    <ul>
      {["a", "b", "c"].map(function(item) {
        return <li key={item}>{item}</li>
      })}
    </ul>
  )

  async function getArticles() {
    return await fetchArticles()
  }

  async function demo() {
    const db = await openDB("Articles", 1, {
      upgrade(db) {
        // Create a store of objects
        const store = db.createObjectStore("articles", {
          // The 'id' property of the object will be the key.
          keyPath: "id",
          // If it isn't explicitly set, create a value by auto incrementing.
          autoIncrement: true,
        })
        // Create an index on the 'date' property of the objects.
        store.createIndex("date", "date")
      },
    })

    // Add an article:
    await db.add("articles", {
      title: "Article 1",
      date: new Date("2019-01-01"),
      body: "…",
    })

    // Add multiple articles in one transaction:
    {
      const tx = db.transaction("articles", "readwrite")
      tx.store.add({
        title: "Article 2",
        date: new Date("2019-01-01"),
        body: "…",
      })
      tx.store.add({
        title: "Article 3",
        date: new Date("2019-01-02"),
        body: "…",
      })
      await tx.done
    }

    // Get all the articles in date order:
    console.log(await db.getAllFromIndex("articles", "date"))

    // Add 'And, happy new year!' to all articles on 2019-01-01:
    // {
    //   const tx = db.transaction("articles", "readwrite")
    //   const index = tx.store.index("date")

    //   while (cursor) {
    //     console.log(cursor.key, cursor.value)
    //     cursor = await cursor.continue()
    //   }

    // for await (const cursor of index.iterate(new Date("2019-01-01"))) {
    //   const article = { ...cursor.value }
    //   article.body += " And, happy new year!"
    //   cursor.update(article)
    // }

    //   await tx.done
    // }
  }

  // demo()

  const [task, setTask] = useState("")
  const [count, setCount] = useState(0)

  const setCountAndWrite2Db = () => {
    console.log(task)
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    // alert(`Submitting Task ${task}`)
    // db.transaction(["tasks"], "readwrite")
    //   .objectStore("tasks")
    //   .add(task)
    // alert(`Task ${task} added`)
  }
  const SimpleList3 = () => (
    <ul>
      {["a", "b", "c"].map(function(item) {
        return <li key={item}>{item}</li>
      })}
    </ul>
  )

  // const d = [
  //   {
  //     title: "Article 1",
  //     date:
  //       "Tue Jan 01 2019 01:00:00 GMT+0100 (Srednjeevropski standardni čas)",
  //     body: "…",
  //     id: 1,
  //   },
  //   {
  //     title: "Article 2",
  //     date:
  //       "Tue Jan 01 2019 01:00:00 GMT+0100 (Srednjeevropski standardni čas)",
  //     body: "…",
  //     id: 2,
  //   },
  // ]

  // await fetchArticles().then(

  // )
  const d = getArticles()

  async function showAvatar() {
    let githubResponse = await fetch(
      `https://api.github.com/users/RobertSefman`
    )
    let githubUser = await githubResponse.json()

    // show the avatar
    let img = document.createElement("img")
    img.src = githubUser.avatar_url
    document.body.append(img)
    await new Promise((resolve, reject) => setTimeout(resolve, 3000))
    img.remove()
    return githubUser
  }

  showAvatar()

  console.log("----------d-------------------")
  console.log(d)
  console.log("----------d-------------------")

  const SimpleList2 = () => (
    <ul>
      {/* {d.map(function(item) {
        return <li key={item.id}>{item.title}</li>
      })} */}
    </ul>
  )

  const onClick = e => {
    const iframe = document.createElement("iframe")
    iframe.name = "printf"
    iframe.id = "printf"
    iframe.height = 0
    iframe.width = 0
    document.body.appendChild(iframe)

    const html = `<p>Test</p>`
    var newWin = window.frames["printf"]
    newWin.document.write(`<body onload="window.print()">${html}</body>`)
    newWin.document.close()
  }

  return (
    <div>
      <button onClick={onClick}>Print Barcode</button>
      {/* <Print /> */}
      <SimpleList2 />
      <SimpleList />
      <p>You clicked {count} times</p>
      {/* <button onClick={() => setCount(count + 1)}>Click me</button> */}
      <button onClick={setCountAndWrite2Db}>Click me</button>
      <form onSubmit={handleSubmit}>
        <label>
          Task:
          <input
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
        </label>
        <input type="submit" value="Confirm" />
      </form>
    </div>
  )
}

export default IndexPage
