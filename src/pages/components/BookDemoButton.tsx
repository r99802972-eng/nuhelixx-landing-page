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
      className="fixed bottom-8 right-8 bg-gradient-to-r from-gray-900 to-gray-600 hover:from-black hover:to-gray-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
    >
      Book a Demo
    </button>
  );
};

export default BookDemoButton;
