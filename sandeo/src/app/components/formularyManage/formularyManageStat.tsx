export default function FormularyManageStat() {
    return(
        <div className="FormularyManageStat w-11/12 absolute bottom-0 h-96">
            <h1 className="text-primary text-6xl">Vos statistiques : </h1>
            <div className="statistic flex justify-around pt-10 flex-wrap">
                <div className="statistic-card w-72">
                    <h2 className="text-2xl">Réponses à vos sondages:</h2>
                    <p className="text-4xl text-primary">0</p>
                </div>
                <div className="statistic-card w-72">
                    <h2 className="text-2xl">Questions :</h2>
                    <p className="text-4xl text-primary">0</p>
                </div>
                <div className="statistic-card w-72">
                    <h2 className="text-2xl">Nombre de sondages :</h2>
                    <p className="text-4xl text-primary">0</p>
                </div>
            </div>
        </div>
    );
};