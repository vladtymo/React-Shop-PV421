import { useContext, useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import {
    HeartFilled,
    HeartTwoTone,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { isFavProduct, toggleFavProduct } from '../services/favorites.service';
import { FavoriteContext } from '../contexts/favorite.context';

const { Meta } = Card;

const api = import.meta.env.VITE_API_PATH + 'products';

export default function Home() {
    const [products, setProducts] = useState([]);
    const { add, remove, isFav } = useContext(FavoriteContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const res = await fetch(api);
        const data = await res.json();
        setProducts(data);
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Row gutter={[30, 16]}>
                {products.map(i =>
                    <Col className="gutter-row" span={6}>
                        <Card
                            hoverable
                            // onClick={() => window.location.href = `/products/${i.id}`}
                            style={{ minHeight: '100%', backgroundColor: '#f0f2f5', padding: '10px' }}
                            cover={
                                // <Link to={`/details/${i.id}`}>
                                <img alt={i.title} src={i.image} height={260} style={{ objectFit: "contain" }} />
                                // </Link>
                            }
                            actions={[
                                <ShoppingCartOutlined
                                    key="add-to-cart"
                                    style={{ color: 'darkgreen' }} />,
                                isFav(i.id) ?
                                    <HeartFilled key="fav-no"
                                        style={{ color: '#eb2f96' }}
                                        onClick={e => {
                                            remove(i.id);
                                        }} />
                                    :
                                    <HeartTwoTone twoToneColor="#eb2f96" key="fav-yes"
                                        onClick={e => {
                                            add(i.id);
                                        }} />
                            ]}
                        >
                            <Meta title={i.title} description={`${i.price}$ - ${i.category}`} />
                        </Card>
                    </Col>
                )}
            </Row>

            {/* <img width={500} src="https://img.freepik.com/free-vector/shop-with-sign-open-design_23-2148544029.jpg?semt=ais_hybrid&w=740" alt="" /> */}
        </div >
    )
}
