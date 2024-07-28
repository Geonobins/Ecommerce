import { useEffect, useState } from "react";
import Card from "./Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";


interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    image: string[];
    availability: number;
    reviews: { id: number; user: string; rating: number; review: string; date: string }[];
    category: string[];
    subcategory: string;
}

export const ProductCarousel = (props? : any) => {
    const [products, setProducts] = useState<Product[]>([]);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 8
        },
        desktop: {
            breakpoint: { max: 3000, min: 1619 },
            items: 5
        },
        bigtablet: {
            breakpoint: { max: 1619, min: 1484 },
            items: 4
        },
        
        tablet: {
            breakpoint: { max: 1484, min: 950 },
            items: 3
        },
        foldablemobile: {
            breakpoint: { max: 950, min: 660 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 660, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        axios.get('https://jsondummy.vercel.app/api/products?type=furniture')
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);
    
    const filteredProducts = props.subcategory === ""?products: products.filter(product =>
        ( product.subcategory === props.category)
      );
      

    return (
        <div>
            <Carousel 
                
                swipeable={true} 
                    draggable={true}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={false}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    partialVisible={true} 
                    
                    dotListClass="custom-dot-list-style"
                    itemClass="pr-1">
                {filteredProducts.slice(0, 10).map((product) => (
                    <Card
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        image={product.thumbnail}
                    />
                ))}
            </Carousel>;
        </div>
    )
}
