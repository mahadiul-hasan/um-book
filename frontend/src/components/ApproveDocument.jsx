import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useApprovedDocumentMutation } from "../redux/features/document/documentApi";

const ApproveDocument = ({ id }) => {
	const [approveDocument, { isLoading }] = useApprovedDocumentMutation();

	const handleApproved = async (e) => {
		e.preventDefault();
		try {
			const response = await approveDocument(id);
			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				toast.success(response.data.message);
				window.location.reload();
			}
		} catch (error) {
			console.error("Unexpected error occurred:", error);
			toast.error(
				"An unexpected error occurred. Please try again later."
			);
		}
	};
	return (
		<>
			{isLoading ? (
				<div className="flex justify-center">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			) : (
				<div className="flex w-full h-full items-center justify-center space-x-4">
					<button
						onClick={handleApproved}
						className="bg-emerald-600 py-2 px-4 rounded text-white"
					>
						Approved
					</button>
				</div>
			)}
		</>
	);
};

ApproveDocument.propTypes = {
	id: PropTypes.string.isRequired,
};

export default ApproveDocument;
