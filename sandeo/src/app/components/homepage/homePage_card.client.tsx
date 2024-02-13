export default function Card() {
  return (
      <div className="card h-full grid gap-y-8 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
          <div className="card w-96 bg-primary text-primary-content min-h-72 md:w-full lg:w-96">
              <div className="card-body">
                  <h2 className="card-title">Sondage </h2>
                  <p>Via cette espace vous pouvez crée un sondage</p>
                  <div className="card-actions justify-end">
                      <button className="btn">Crée un sondage</button>
                  </div>
              </div>
          </div>
          <div className="card w-96 bg-primary text-primary-content min-h-72 md:w-full lg:w-96">
              <div className="card-body">
                  <h2 className="card-title">Mes sondages</h2>
                  <p>Voir l'ensemble des sondages que j'ai crée et les informations associés à celles-ci </p>
                  <div className="card-actions justify-end">
                      <button className="btn">Voir mes sondages</button>
                  </div>
              </div>
          </div>
          <div className="card w-96 bg-primary text-primary-content min-h-72 md:w-full lg:w-96">
              <div className="card-body">
                  <h2 className="card-title">Mes données</h2>
                  <p>Vous pouvez extraires les données associées à votre compte  </p>
                  <div className="card-actions justify-end">
                      <button className="btn">Accéder à mes données</button>
                  </div>
              </div>
          </div>
          <div className="card w-96 bg-primary text-primary-content min-h-72 md:w-full lg:w-96">
              <div className="card-body">
                  <h2 className="card-title">Mes statistiques</h2>
                  <p>Ayez les statisques pour chaques sondages que vous avez crée</p>
                  <div className="card-actions justify-end">
                      <button className="btn">Voir mes statistiques</button>
                  </div>
              </div>
          </div>

      </div>
  );
}