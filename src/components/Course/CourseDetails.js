import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {
    GET_COURSE,
    COURSE_RECEIVED,
    COURSE_PAGE_UNLOADED,
    COURSE_NAV_TOGGLED

} from '../../constants/actionTypes';
import Loading from '../Commons/Loading';

const mapStateToProps = state => ({
    courseDetails: state.courseDetails
});

const mapDispatchToProps = dispatch => ({
    getCourse: payload =>
        dispatch({ type: GET_COURSE, payload }),
    onUnload: () => 
        dispatch({ type: COURSE_PAGE_UNLOADED}),
    courseNavToggled: payload =>
        dispatch({ type: COURSE_NAV_TOGGLED, payload })
    
});

class CourseDetails extends Component {
    constructor(props) {
        super(props);
        

    }
    componentDidMount() {
        this.props.getCourse();
    }

    componentWillUnmount() {
        this.props.onUnload();
    }
    render() {
        
        if(!this.props.courseDetails.course.courses || this.props.courseDetails.loading) {
            return (
                <Loading loading={this.props.courseDetails.loading} />
            )
        }
        const selectedCourse = this.props.courseDetails.course.courses.filter(course => course.id === this.props.selectedCourseId)[0];
         
        
        const isCourseNavExpanded = this.props.courseDetails.isCourseNavExpanded;

        const levels = selectedCourse.levels.map((level) => {
            return (
                <NavItem key={level.id} eventKey={level.levelCode}>
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        {level.name}
                    </NavText>
                </NavItem>
            )
        });
        
        return (

            <React.Fragment>
                <SideNav
                    onSelect={(selected) => {

                    }}
                    onToggle={(isToggled) => {
                        this.props.courseNavToggled(isToggled);
                    }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav >

                        {levels}
                    </SideNav.Nav>
                </SideNav>

                <div className={`course-content ${isCourseNavExpanded ? 'expanded' : ''}`}>Main Contant...</div>
            </React.Fragment>

        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);