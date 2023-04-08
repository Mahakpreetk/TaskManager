import { Table } from "flowbite-react"
import Thead from "./Thead"

interface CustomTableProps {
  heading: string[]
  tbody: React.ReactNode
}

const CustomTable: React.FC<CustomTableProps> = ({ heading, tbody }) => {
  return (
    <Table>
      <Thead items={heading} />
      {tbody}
    </Table>
  )
}

export default CustomTable
