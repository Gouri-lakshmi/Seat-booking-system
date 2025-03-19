import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SeatBooking = () => {

    const seatRows = 6;
    const seatsPerRow = 10;
    const seatPrices = {
        Silver: 100,
        Gold: 150,
        Platinum: 200,
    };

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleSeat = (seatId, price) => {
        const isSeatSelected = selectedSeats.some((seat) => seat.id === seatId);

        if (isSeatSelected) {
            setSelectedSeats(selectedSeats.filter((seat) => seat.id !== seatId));
            setTotalCost(totalCost - price);
        } else {
            if (selectedSeats.length < 8) {
                setSelectedSeats([...selectedSeats, { id: seatId, price }]);
                setTotalCost(totalCost + price);
            } else {
                toast.error("You can only select up to 8 seats.");
            }
        }
    };

    const getSeatPrice = (rowIndex) => {
        if (rowIndex <= 1) return { price: seatPrices.Platinum, category: 'Platinum' };
        if (rowIndex <= 3) return { price: seatPrices.Gold, category: 'Gold' };
        return { price: seatPrices.Silver, category: 'Silver' };
    };

    const getSeatColor = (category) => {
        switch (category) {
            case 'Platinum':
                return 'bg-gray-400';
            case 'Gold':
                return 'bg-yellow-500';
            case 'Silver':
                return 'bg-gray-100';
            default:
                return 'bg-gray-200';
        }
    };

    const generateSeats = () => {
        let seats = [];
        for (let rowIndex = 0; rowIndex < seatRows; rowIndex++) {
            for (let seatIndex = 0; seatIndex < seatsPerRow; seatIndex++) {
                const seatId = `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`;
                const { price, category } = getSeatPrice(rowIndex);
                const isSelected = selectedSeats.some((seat) => seat.id === seatId);

                seats.push(
                    <div
                        key={seatId}
                        onClick={() => toggleSeat(seatId, price)}
                        className={`seat w-12 h-12 flex items-center justify-center cursor-pointer rounded-md border ${isSelected ? "bg-green-500 text-white" : getSeatColor(category)} hover:bg-gray-300 transition`}
                    >
                        {seatId}
                    </div>
                );
            }
        }
        return seats;
    };

    return (
        <div className="seat-booking mx-auto max-w-4xl p-6 bg-white shadow-xl rounded-lg mb-20">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-black-600 tracking-wide uppercase">Book Your Seat</h1>
            <div className="seat-grid grid grid-cols-10 gap-2 mb-4">
                {generateSeats()}
            </div>

            <div className="summary mt-6 border-t pt-4">

                {selectedSeats.length === 0 ? (
                    <p className="text-gray-500 italic text-center mt-4">
                        Seats are waiting for you! Choose your favorites.
                    </p>
                ) : (
                    <>
                        <h2 className="font-semibold text-lg text-gray-800 italic">Booking Summary</h2>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-md mt-4">
                            <ul className="list-none space-y-2">
                                {selectedSeats.map((seat) => (
                                    <li key={seat.id} className="flex justify-between text-gray-800">
                                        <span>{seat.id}</span>
                                        <span>₹{seat.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>

            {selectedSeats.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center max-w-4xl mx-auto rounded-lg">
                    <div className="total-cost text-xl font-extrabold text-gray-800">
                        Total Cost: ₹{totalCost}
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition ease-in-out transform cursor-pointer"
                    >
                        Book Now
                    </button>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 backdrop-blur-md">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96 text-center">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mt-4">Awesome!</h2>
                        <p className="text-gray-600 mt-2">Your booking has been confirmed.</p>
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                setSelectedSeats([]);
                                setTotalCost(0);
                            }}
                            className="mt-4 py-2 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatBooking;
