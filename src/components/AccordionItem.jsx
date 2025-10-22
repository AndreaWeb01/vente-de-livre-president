
export default function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center border-b"
      >
        <span className=" text-textColor text-[18px]">{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="px-4 py-5 text-textColor">{content}</div>
      )}
    </div>
  );
}