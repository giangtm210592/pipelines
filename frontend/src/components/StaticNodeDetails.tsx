/*
 * Copyright 2018-2019 The Kubeflow Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import DetailsTable from './DetailsTable';
import { classes, stylesheet } from 'typestyle';
import { commonCss, fontsize } from '../Css';
import { SelectedNodeInfo } from '../lib/StaticGraphParser';
import { t } from 'i18next'
export type nodeType = 'container' | 'resource' | 'dag' | 'unknown';

const css = stylesheet({
  fontSizeTitle: {
    fontSize: fontsize.title,
  },
  taskTitle: {
    fontSize: fontsize.title,
    fontWeight: 'bold',
    paddingTop: 20,
  },
});

interface StaticNodeDetailsProps {
  nodeInfo: SelectedNodeInfo;
}

class StaticNodeDetails extends React.Component<StaticNodeDetailsProps> {
  public render(): JSX.Element {
    const nodeInfo = this.props.nodeInfo;

    return (
      <div>
        {nodeInfo.nodeType === 'container' && (
          <div>
            <DetailsTable title={t('StaticNodeDetails.inputParameters')} fields={nodeInfo.inputs} />

            <DetailsTable title={t('StaticNodeDetails.outputParameters')} fields={nodeInfo.outputs} />

            <div className={classes(commonCss.header, css.fontSizeTitle)}>Arguments</div>
            {nodeInfo.args.map((arg, i) => (
              <div key={i} style={{ fontFamily: 'monospace' }}>
                {arg}
              </div>
            ))}

            <div className={classes(commonCss.header, css.fontSizeTitle)}>Command</div>
            {nodeInfo.command.map((c, i) => (
              <div key={i} style={{ fontFamily: 'monospace' }}>
                {c}
              </div>
            ))}

            <div className={classes(commonCss.header, css.fontSizeTitle)}>Image</div>
            <div style={{ fontFamily: 'monospace' }}>{nodeInfo.image}</div>

            <DetailsTable title={t('StaticNodeDetails.volumeMounts')} fields={nodeInfo.volumeMounts} />
          </div>
        )}

        {nodeInfo.nodeType === 'resource' && (
          <div>
            <DetailsTable title={t('StaticNodeDetails.inputParameters')} fields={nodeInfo.inputs} />

            <DetailsTable title={t('StaticNodeDetails.outputParameters')} fields={nodeInfo.outputs} />

            <DetailsTable title={t('StaticNodeDetails.manifest')} fields={nodeInfo.resource} />
          </div>
        )}

        {!!nodeInfo.condition && (
          <div>
            <div className={css.taskTitle}>{t('StaticNodeDetails.condition')}</div>
            <div>{t('StaticNodeDetails.runWhen')} {nodeInfo.condition}</div>
          </div>
        )}
      </div>
    );
  }
}

export default StaticNodeDetails;
