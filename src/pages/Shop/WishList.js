import PageTitle from "../../components/Common/PageTitle";
import WishListArea from "../../components/Shop/WishListArea";

function WishList() {
  return (
    <div className="wishlist-wrapper">
      <PageTitle title="Wishlist" />
      <WishListArea />
    </div>
  );
}

export default WishList;
