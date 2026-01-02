import BookingRequestForm from "./Components/BookingRequestForm";
import HeroSlider from "./Components/HeroSlider";
import HomestayFooter from "./Components/HomestayFooter";
import KeyFeatures from "./Components/KeyFeatures";
import MapEmbedExample from "./Components/MapEmbedExample";
import Navbar from "./Components/Navbar";
import NearbyLocations from "./Components/NearbyLocations";
import OrchardHomestayDetails from "./Components/OrchardHomestayDetails";
import ParallaxSection from "./Components/ParallaxSection";
import PhotoGallery from "./Components/PhotoGallery";
import PricingPlans from "./Components/PricingPlans";
import StickyContactBar from "./Components/StickyContactBar";

// import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <OrchardHomestayDetails />
      <ParallaxSection />
      <PricingPlans />
      <PhotoGallery />
      <NearbyLocations />
      <KeyFeatures />
      <BookingRequestForm />
      <MapEmbedExample />
      <HomestayFooter />
      <StickyContactBar />
    </>
  );
};

export default App;
