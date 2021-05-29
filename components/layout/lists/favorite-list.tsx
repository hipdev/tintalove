import { FiPlus } from "react-icons/fi"

const FavoriteList = () => {
    return(
        <div className="relative  w-full">
            <div className="absolute   right-0 w-auto sm:w-609 min-h-screen bg-dark-500">
                <div className="bg-ocean_blue-300 w-full h-24 flex items-center justify-around mb-6">
                        <h1 className="text-white text-2xl font-semibold">Mis favoritos</h1>
                        <button className="bg-primary hover:bg-primaryHover p-2 rounded-md"><span className="text-white text-3xl"><FiPlus /></span></button>
                    </div>
                <div className="w-full h-6 px-8">
                    <div className="bg-ocean_blue-300 p-4 rounded-md mb-6">
                        <div className="flex items-center">
                            <div className="w-20 h-20 bg-gray-500 rounded-lg mr-5 flex-shrink-0"></div>
                            <div className="w-full">
                                <p className="text-white">Nueva lista</p>
                                <div className="flex items-center w-full">
                                     <input type="text" className="bg-transparent px-3 placeholder-white border-2 border-light-400 mr-5 w-11/12 rounded-md py-2" placeholder="Mis favoritos!"/>
                                    <button className="bg-primary hover:bg-primaryHover p-2 rounded-md"><span className="text-white text-3xl "><FiPlus /></span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className="bg-ocean_blue-300 p-4 rounded-md ">
                        <div className="flex items-center">
                            <div className="w-20 h-20 bg-gray-500 rounded-lg mr-5 flex-shrink-0"></div>
                            <div className="w-full ">
                                <p className="text-white">Opciones en blanco y negro</p>
                                <span className="text-light-600 text-sm align-top">1 publicación</span>
                                <div className="flex items-center w-full"> 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavoriteList