 export default function FormularyManageForm() {
     return (
         <div className="formularyManage flex flex-col w-80 m-auto border border-secondary rounded-lg p-3 bg-primary">
             <div className=" w-full">
                 <input type="text" placeholder="Nom du Sondage" className="input input-ghost w-full h-24 text-gray-400 text-lg "/>
             </div>
             <div className="toggle_part grid grid-cols-2">
             <div className="form-control">
                     <label className="label cursor-pointer">
                         <span className="label-text text-gray-400">Privé : </span>
                         <input type="checkbox" className="toggle toggle-primary"/>
                     </label>
                 </div>
                 <div className="form-control">
                     <label className="label cursor-pointer">
                         <span className="label-text text-gray-400">Noté :  </span>
                         <input type="checkbox" className="toggle toggle-primary"/>
                     </label>
                 </div>
             </div>
             <button className="btn btn-secondary">Crée le Sondage</button>
         </div>
     );
 };