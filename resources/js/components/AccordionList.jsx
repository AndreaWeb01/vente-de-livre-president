import { useState } from "react";
import AccordionItem from "./AccordionItem";
import { useTranslation } from "react-i18next";
export default function AccordionList({title}) {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

  const items = [
    {
      title: t("accordion.item1.title"),
      content: t("accordion.item1.content"),
    },
    {
      title: t("accordion.item2.title"),
      content: t("accordion.item2.content"),
    },
    {
      title: t("accordion.item3.title"),
      content: t("accordion.item3.content"),
    },
  ];

  return (
    <div className=" ">
        <h2 className=" text-2xl md:text-3xl font-bold text-primary mb-10 md:mb-20 text-center md:w-[60%] w-[80%] mx-auto ">
            {title}        
        </h2>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
}
