import { Table } from "flowbite-react"

interface TheadProps {
  items: string[]
}

const Thead: React.FC<TheadProps> = ({ items }) => {
  return (
    <Table.Head>
      {items.map(item =>
        <Table.HeadCell>
          {item}
        </Table.HeadCell>
      )}
    </Table.Head>
  )
}

export default Thead
