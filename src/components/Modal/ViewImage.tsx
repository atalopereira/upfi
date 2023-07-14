import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="fit-content" bgColor="pGray.800" maxWidth="none">
        <ModalBody padding={0}>
          <Image src={imgUrl} alt="big image" maxWidth={900} maxHeight={600} />
        </ModalBody>

        <ModalFooter
          bgColor="pGray.800"
          padding="8px 10px"
          justifyContent="flex-start"
          borderBottomLeftRadius={6}
          borderBottomRightRadius={6}
        >
          <Link
            href={imgUrl}
            isExternal
            color="pGray.50"
            _hover={{ textDecoration: 'none' }}
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
