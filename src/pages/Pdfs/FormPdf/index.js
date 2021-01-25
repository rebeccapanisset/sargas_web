import React, { useRef, useState, useEffect, useCallback } from 'react';

import { Form } from '@unform/web';
import { useHistory, useParams } from 'react-router-dom';
import { Container, FormContainer, ActionButtons } from './styles';
import Input from '~/components/Input';
import Button from '~/components/Button';
import SubtitleModal from '~/components/SubtitleModal';
import { usePdf } from '~/connection/Pdf';
import { useDocumentTypes } from '~/connection/DocumentTypes';
import { useTankTypes } from '~/connection/TankTypes';
import { checkValidation } from '~/libs/checkSchemaValidation';
import schema from './validation';
import Select from '~/components/Select';

import Editor from '~/components/Editor';

function FormPdf() {
  const history = useHistory();
  const formRef = useRef();

  const { storePdf, updatePdf, getPdf, showPdf } = usePdf();
  const { getDocumentTypes } = useDocumentTypes();
  const { getTankTypes } = useTankTypes();

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [subtitleShow, setSubtitleShow] = useState(false);
  const [types, setTypes] = useState([]);
  const [docTypes, setDocTypes] = useState([]);

  const { id } = useParams();
  const update = !!id;

  const handleBlur = useCallback((event, editorContents) => {
    setContent(editorContents);
  });

  const handleForm = useCallback(async (data) => {
    setLoading(true);

    data = { ...data, content, type_id: data.type, doc_type_id: data.docType };

    if (await checkValidation(formRef, data, schema)) {
      const response = update
        ? await updatePdf(data, id)
        : await storePdf(data);

      if (response) {
        history.push(`/pdfs`);
        setLoading(false);
      }
    }

    setLoading(false);
  });

  const handleConfirm = useCallback(() => {
    setSubtitleShow(true);
  });

  const handleShowPDF = useCallback(async () => {
    const response = await showPdf(content);
    const file = new Blob([response.data], { type: 'application/pdf' });
    window.open(URL.createObjectURL(file), '_blank');
  });

  const handleClose = useCallback(() => {
    setSubtitleShow(false);
  });

  useEffect(() => {
    async function loadData() {
      const responseTypes = await getTankTypes();
      const responseDocTypes = await getDocumentTypes();

      const changedDocTypes = responseDocTypes.map((docType) => {
        return {
          id: docType.id,
          value: docType.id,
          label: docType.name,
        };
      });
      const changedTypes = responseTypes.map((type) => {
        return {
          id: type.id,
          value: type.id,
          label: type.name,
        };
      });

      setDocTypes(changedDocTypes);
      setTypes(changedTypes);

      if (id) {
        const responsePdf = await getPdf(id);
        setContent(responsePdf.content);
        formRef.current.setData(responsePdf);

        const docType = changedDocTypes.find(
          (option) => option.id === responsePdf.doc_type_id
        );
        const type = changedTypes.find(
          (option) => option.id === responsePdf.type_id
        );

        formRef.current.setFieldValue('docType', docType);
        formRef.current.setFieldValue('type', type);
      }
    }

    loadData();
  }, [id]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleForm}>
        <FormContainer>
          <div>
            <Input
              type="text"
              name="title"
              placeholder="Título"
              label="Título"
            />
          </div>
          <div>
            <Select
              name="type"
              placeholder="Tipo de Tanque"
              options={types}
              label="Tipo de Tanque"
            />
          </div>
          <Select
            name="docType"
            placeholder="Tipo de Documento"
            options={docTypes}
            lablel="Tipo de Documento"
          />
        </FormContainer>
        <div>
          <Editor name="content" value={content} onBlur={handleBlur} />
        </div>
        <ActionButtons>
          <Button type="button" bg="info" onClick={handleConfirm}>
            Legenda
          </Button>
          <Button
            type="button"
            bg="success"
            loading={loading}
            onClick={handleShowPDF}
            margin="10px 0 0"
          >
            Visualizar PDF
          </Button>
          <Button type="submit" loading={loading} margin="10px 0 0">
            {update ? 'Editar' : 'Salvar'}
          </Button>
        </ActionButtons>
      </Form>

      <SubtitleModal
        show={subtitleShow}
        onHide={handleClose}
        title="Legenda de Dados"
        size="lg"
      />
    </Container>
  );
}

export default FormPdf;
