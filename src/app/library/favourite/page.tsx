import FavFilmsList from "@/components/FavFilmsList";

const FavouritePage = () => {

    
    return (
        <>
            <div className="profile-flex-container">
                <div className="all-movies-container">
                    <section className="fav-movies-section">
                        <div className="profile-title-container">
                            <h1 className={`profile-title`} >Favourite movies</h1>
                        </div>
                        <div className="fav-movies-container">
                            <FavFilmsList />
                        </div>
                    </section>
                </div>
            </div>    
        </>
    )
}

export default FavouritePage;