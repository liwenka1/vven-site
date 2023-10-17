import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Kbd,
  useDisclosure,
  Input,
  Listbox,
  ListboxItem
} from '@nextui-org/react'
import { RiSearchLine } from 'react-icons/ri'

const SearchButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const items = [
    {
      key: 'new',
      label: 'New file'
    },
    {
      key: 'copy',
      label: 'Copy link'
    },
    {
      key: 'edit',
      label: 'Edit file'
    },
    {
      key: 'delete',
      label: 'Delete file'
    }
  ]

  return (
    <>
      <div className="flex md:hidden cursor-pointer" onClick={onOpen}>
        <RiSearchLine size={20} />
      </div>
      <Button className="hidden md:flex justify-between" size="sm" type="button" onPress={onOpen}>
        <RiSearchLine size={18} />
        <span>Quick Search...</span>
        <Kbd keys={['ctrl']}>K</Kbd>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl" backdrop="blur" hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader />
              <ModalBody>
                <Input
                  className="w-full"
                  placeholder="Search"
                  labelPlacement="outside"
                  startContent={
                    <RiSearchLine className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  endContent={<Kbd>ESC</Kbd>}
                />
                <Listbox items={items} aria-label="Dynamic Actions" onAction={(key) => alert(key)}>
                  {(item) => (
                    <ListboxItem
                      key={item.key}
                      color={item.key === 'delete' ? 'danger' : 'default'}
                      className={item.key === 'delete' ? 'text-danger' : ''}
                    >
                      {item.label}
                    </ListboxItem>
                  )}
                </Listbox>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SearchButton
