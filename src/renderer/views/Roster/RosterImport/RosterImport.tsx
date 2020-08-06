import React, { FunctionComponent, RefObject, ChangeEvent, useEffect, useState } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import {
  Jumbotron,
  Container,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormFeedback,
  Input,
} from 'reactstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import { useRosters } from '../../../behaviors/use-rosters/use-rosters';
import { logInfo, logError } from '../../../../utils/logger';
import { parseXml } from '../../../../utils/xml-parser';
import { mapRosterData } from '../../../../utils/data-mapper';

interface RosterImportFormInputs {
  filePath: string;
}

const RosterImport: FunctionComponent<RouteComponentProps> = () => {
  const rosters = useRosters();

  const [filePath, setFilePath] = useState('');
  const { handleSubmit, errors, setError } = useForm<RosterImportFormInputs>({
    defaultValues: { filePath },
  });

  const onSubmit = async () => {
    logInfo('Roster Import form submitted', false, { filePath });

    try {
      const rosterData = await parseXml(filePath);

      if (!rosterData) {
        logError('Unable to parse XML data', false, { filePath });
      } else {
        const { roster } = mapRosterData(rosterData);

        rosters.set(roster.id, roster);
        logInfo('Set roster data', false, { roster, store: rosters.store });
        navigate(`/rosters/${roster.id}`);
      }
    } catch (error) {
      logError(error.message ? error.message : 'Error parsing roster data', false, error);
    }
  };

  return (
    <div className="roster-import">
      <Jumbotron>
        <h1>Import a Roster</h1>
        <p className="roster-import__instructions">
          Select a BattleScribe Roster file (.ros) to import into Battlebuddy. Note, the file must
          be saved as an uncompressed <strong>.ros</strong> file. Using a compressed .rosz file will
          not work.
        </p>
        <p className="roster-import__instructions">
          To save a roster as an uncompressed <strong>.ros</strong> file, follow these steps in
          BattleScribe:
        </p>
        <ul className="roster-import__instructions">
          <li>
            In the menu bar, select the &quot;Save roster as ...&quot; option (the save icon with
            the three dots)
          </li>
          <li>
            In the save menu, look for the option to choose which file type to save the file as.
          </li>
          <li>
            Select the <strong>.ros</strong> or &quot;BattleScribe roster file (uncompressed)&quot;
            option.
          </li>
        </ul>
      </Jumbotron>
      <Container className="d-flex flex-row justify-content-center" fluid="lg">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="rosterImportInput">
              {filePath ? `Selected file: ${filePath.split('\\').reverse()[0]}` : 'Select a file'}
              <CustomInput
                id="rosterImportInput"
                name="filePath"
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { value } = e.target;

                  if (!value) {
                    setError('filePath', {
                      type: 'required',
                      message: 'Please select a valid uncompressed BattleScribe roster file (.ros)',
                    });
                    return;
                  }

                  const match = value.match(/\.ros$/i);

                  if (!(match && !!match.length)) {
                    setError('filePath', {
                      type: 'notMatch',
                      message: 'Please select a valid uncompressed BattleScribe roster file (.ros)',
                    });
                  } else {
                    setFilePath(e.target.files ? e.target.files[0].path : '');
                  }
                }}
              />
            </Label>
            {errors && errors.filePath && (
              <FormFeedback valid={false}>{errors.filePath.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Button type="submit" disabled={!!errors.filePath || !filePath}>
              Import
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default RosterImport;
