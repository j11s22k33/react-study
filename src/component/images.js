import animal from "assets/images/animal.jpg"

export default ()=>{
  return (
    <>      
      <img src="/images/vscode.png" alt="public/images/vscode.png"/>
      <img src={require("assets/images/apple.jpg")} alt="src/assets/images/apple.jpg"/>
      <img src={animal} alt="src/assets/images/animal.jpg"/>
    </>
  )
}