import { Table } from "flowbite-react"

interface TheadProps {
  items: string[]
}

const Thead: React.FC<TheadProps> = ({ items }) => {
  if (!items) {
    return null; // Or display a default table head if desired
  }

  return (
    <Table.Head>
      {items.map((item, index) => (
        <Table.HeadCell key={index}>{item}</Table.HeadCell>
      ))}
    </Table.Head>
  );
};


export default Thead
