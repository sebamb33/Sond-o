const FormularyAccountClient = () => {
    return (
        <div className="flex-column justify-center">
            <div className="flex-column justify-center">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nom</span>
                    </div>
                    <input type="text" placeholder="Nom de l'utilisateur"
                           className="input input-bordered input-primary w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Prénom</span>
                    </div>
                    <input type="text" placeholder="Prénom de l'utilisateur "
                           className="input input-bordered input-primary w-full max-w-xs"/>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Mail</span>
                    </div>
                    <input type="text" placeholder="Mai de l'utilisateur "
                           className="input input-bordered input-primary w-full max-w-xs"/>
                </label>
            </div>
        </div>
    )
};

export default FormularyAccountClient;