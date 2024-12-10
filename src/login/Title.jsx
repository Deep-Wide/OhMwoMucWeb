export default function Title({name}){

    return (
        <div className={"text-3xl font-bold flex justify-center"}>
            <span style={{color:"#1B1B1B", display:"flex"}}>{name}</span>
        </div>
    )
}
