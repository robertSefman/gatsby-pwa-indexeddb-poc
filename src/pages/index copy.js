import React, { useState } from "react"
import { openDB, deleteDB, wrap, unwrap } from "idb"

const IndexPage = () => {
  //Db settings
  const DB_NAME = "myDb2"
  const DB_VERSION = 2
  const DB_STORE_NAME = "tasks"

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

  demo()
  // openDb().then(getObjectStore(DB_STORE_NAME, "readwrite"))
  // addTask("Prvi task")
  // addTask("Drugi task")

  // // Create an objectStore to hold information about our TASKS
  // request.onupgradeneeded = function(event) {
  //   var db = event.target.result
  //   var objectStore = db.createObjectStore("tasks", { autoIncrement: true })

  //   console.log("IN onupgradeneeded -----------------")

  //   // read saved TASKS
  //   objectStore.transaction.oncomplete = function(event) {
  //     db
  //       .transaction("tasks")
  //       .objectStore("tasks")
  //       .get(1).onsuccess = function(event) {
  //       alert(2)
  //       console.log("Task 1: " + event.target.result.task)
  //     }
  //   }
  // }

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

  return (
    <div>
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
