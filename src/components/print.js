// import React, { useState } from "react"
// import html2canvas from "html2canvas"
// import Barcode from "react-barcode"

// const Print = props => {
//   const [value, setValue] = React.useState("")
//   const wrapper_ref = React.useRef()

//   const onChange = e => {
//     setValue(e.target.value)
//   }

//   const onClick = e => {
//     const opt = {
//       scale: 4,
//     }
//     const elem = wrapper_ref.current
//     html2canvas(elem, opt).then(canvas => {
//       const iframe = document.createElement("iframe")
//       iframe.name = "printf"
//       iframe.id = "printf"
//       iframe.height = 0
//       iframe.width = 0
//       document.body.appendChild(iframe)

//       const imgUrl = canvas.toDataURL({
//         format: "jpeg",
//         quality: "1.0",
//       })

//       const style = `
//           height:100vh;
//           width:100vw;
//           position:absolute;
//           left:0:
//           top:0;
//       `

//       const url = `<img style="${style}" src="${imgUrl}"/>`
//       var newWin = window.frames["printf"]
//       newWin.document.write(`<body onload="window.print()">${url}</body>`)
//       newWin.document.close()
//     })
//   }

//   return (
//     <div className="App">
//       <input type="text" onChange={onChange} value={value} />
//       {/**This wrapper is important*/}
//       <div ref={wrapper_ref}>
//         <Barcode value={value} />
//       </div>
//       <button onClick={onClick}>Print Barcode</button>
//     </div>
//   )
// }

// export default Print
