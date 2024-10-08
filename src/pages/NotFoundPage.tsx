import ButtonComponent from "@/components/ButtonComponent"
import { FooterComponent } from "@/components/FooterComponent"
import Navbar from "@/components/Navbar"
import { useNavigate } from "react-router-dom"


const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex-1">
        <Navbar />
        <section className="bg-white dark:bg-gray-900 my-44">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
              <div onClick={() => { navigate("/home") }}>
                <ButtonComponent value="Home" bg="bg-gray-200" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <FooterComponent />
    </div>
  )
}

export default NotFoundPage
