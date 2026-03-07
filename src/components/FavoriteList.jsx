import { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { HeartFilled, HeartTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { FavoriteContext } from '../contexts/favorite.context';
import { buyPremiumStatus, cancelPremiumStatus } from '../utilities/blockchainUtils';

const { Meta } = Card;
const FAVORITE_LIMIT = 4;

const api = import.meta.env.VITE_API_PATH + 'products';

export default function FavoriteList() {
    const [products, setProducts] = useState([]);
    const { ids, isPremiumUser, add, remove, isFav, refreshPremiumStatus } = useContext(FavoriteContext);
    const reachedFavoriteLimit = !isPremiumUser && ids.length >= FAVORITE_LIMIT;

    useEffect(() => {
        fetchProducts();
    }, []);

    async function handleBuyPremium() {
        const isSuccess = await buyPremiumStatus();

        if (isSuccess) {
            await refreshPremiumStatus();
            alert('Premium status bought successfully!');
            return;
        }

        alert('Premium purchase failed. Please try again.');
    }

    async function handleCancelPremium() {
        const isSuccess = await cancelPremiumStatus();

        if (isSuccess) {
            await refreshPremiumStatus();
            alert('Premium status cancelled successfully!');
            return;
        }

        alert('Premium cancel failed. Please try again.');
    }

    async function fetchProducts() {
        const res = await fetch(api);
        const data = await res.json();
        setProducts(data);
    }

    const favoriteProducts = useMemo(() => {
        return products.filter(product => ids.includes(product.id));
    }, [products, ids]);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Favorite Products</h2>
            {reachedFavoriteLimit && (
                <Button type="primary" style={{ marginBottom: '16px' }} onClick={handleBuyPremium}>
                    Buy Premium Status
                </Button>
            )}
            {isPremiumUser && (
                <Button style={{ marginBottom: '16px', marginLeft: '8px' }} onClick={handleCancelPremium}>
                    Cancel Premium Status
                </Button>
            )}

            {favoriteProducts.length === 0 ? (
                <p>No favorite products yet.</p>
            ) : (
                <Row gutter={[30, 16]}>
                    {favoriteProducts.map(product => (
                        <Col key={product.id} className="gutter-row" span={6}>
                            <Card
                                hoverable
                                style={{ minHeight: '100%', backgroundColor: '#f0f2f5', padding: '10px' }}
                                cover={<img alt={product.title} src={product.image} height={260} style={{ objectFit: 'contain' }} />}
                                actions={[
                                    <ShoppingCartOutlined key="add-to-cart" style={{ color: 'darkgreen' }} />,
                                    isFav(product.id) ? (
                                        <HeartFilled
                                            key="fav-no"
                                            style={{ color: '#eb2f96' }}
                                            onClick={() => remove(product.id)}
                                        />
                                    ) : (
                                        <HeartTwoTone
                                            twoToneColor="#eb2f96"
                                            key="fav-yes"
                                            onClick={() => add(product.id)}
                                        />
                                    )
                                ]}
                            >
                                <Meta title={product.title} description={`${product.price}$ - ${product.category}`} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
