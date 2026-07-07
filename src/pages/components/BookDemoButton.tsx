const BookDemoButton = () => {
  const handleClick = () => {
    // You can add your booking logic here
    console.log("Book a demo clicked");
    // Uncomment to open a modal or navigate to booking page
    // window.location.href = "/book-demo";
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-[#5A9D3D] hover:bg-[#407700] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
    >
      Book a Demo
    </button>
  );
};

export default BookDemoButton;
